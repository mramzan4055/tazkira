<?php
/**
 * Tazkirah Online Education - Central Email & SMTP Configuration
 * 
 * Edit your Email & Password settings below.
 */

// =========================================================================
// 1. EMAIL & SMTP SETTINGS (Enter your email and password here)
// =========================================================================
define('SMTP_EMAIL',       'info@tazkirahonline.com'); // Your sender email / SMTP username
define('SMTP_PASSWORD',    'YOUR_EMAIL_PASSWORD_HERE'); // Your email password or App Password
define('RECIPIENT_EMAIL',   'info@tazkirahonline.com'); // Admin email where leads are sent
define('SMTP_HOST',        'smtp.gmail.com');          // e.g., smtp.gmail.com or mail.tazkirahonline.com
define('SMTP_PORT',        587);                       // 587 for TLS / STARTTLS, 465 for SSL, 25 for standard
define('SMTP_ENCRYPTION',  'tls');                     // 'tls' or 'ssl' or 'none'
define('SITE_NAME',        'Tazkirah Online Education');
define('USE_SMTP',         true);                      // Set to true to use SMTP email sending

// =========================================================================
// 2. LEAD LOGGING UTILITY (Ensures lead is saved even if mail server fails)
// =========================================================================
function log_submission($type, $data) {
    $dir = __DIR__ . '/submissions';
    if (!is_dir($dir)) {
        @mkdir($dir, 0755, true);
    }
    
    $file = $dir . '/' . $type . '_leads.json';
    $data['timestamp'] = date('Y-m-d H:i:s');
    $data['ip'] = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
    
    $existing = [];
    if (file_exists($file)) {
        $content = file_get_contents($file);
        $existing = json_decode($content, true) ?? [];
    }
    
    array_unshift($existing, $data);
    file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT));
}

// =========================================================================
// 3. SMTP & PHP MAIL SENDER FUNCTION
// =========================================================================
function send_custom_email($to, $subject, $html_body, $reply_to = null) {
    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . SITE_NAME . " <" . SMTP_EMAIL . ">\r\n";
    if ($reply_to) {
        $headers .= "Reply-To: {$reply_to}\r\n";
    }

    // Try Socket SMTP if configured & password provided
    if (USE_SMTP && SMTP_PASSWORD !== 'YOUR_EMAIL_PASSWORD_HERE' && SMTP_EMAIL !== 'info@tazkirahonline.com') {
        try {
            $smtp_result = send_smtp_mail($to, $subject, $html_body, $reply_to);
            if ($smtp_result) return true;
        } catch (Exception $e) {
            error_log("SMTP Error: " . $e->getMessage());
        }
    }

    // Fallback to PHP native mail()
    return @mail($to, $subject, $html_body, $headers);
}

/**
 * Socket-based SMTP implementation (No external dependencies required)
 */
function send_smtp_mail($to, $subject, $html_body, $reply_to = null) {
    $host = (SMTP_ENCRYPTION === 'ssl' ? 'ssl://' : '') . SMTP_HOST;
    $port = SMTP_PORT;

    $socket = fsockopen($host, $port, $errno, $errstr, 15);
    if (!$socket) return false;

    $read = function($expected_code) use ($socket) {
        $response = '';
        while ($line = fgets($socket, 512)) {
            $response .= $line;
            if (substr($line, 3, 1) == ' ') break;
        }
        return (substr($response, 0, 3) == $expected_code);
    };

    if (!$read(220)) return false;

    fputs($socket, "EHLO " . gethostname() . "\r\n");
    if (!$read(250)) return false;

    if (SMTP_ENCRYPTION === 'tls') {
        fputs($socket, "STARTTLS\r\n");
        if (!$read(220)) return false;
        stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT);
        fputs($socket, "EHLO " . gethostname() . "\r\n");
        if (!$read(250)) return false;
    }

    fputs($socket, "AUTH LOGIN\r\n");
    if (!$read(334)) return false;

    fputs($socket, base64_encode(SMTP_EMAIL) . "\r\n");
    if (!$read(334)) return false;

    fputs($socket, base64_encode(SMTP_PASSWORD) . "\r\n");
    if (!$read(235)) return false;

    fputs($socket, "MAIL FROM: <" . SMTP_EMAIL . ">\r\n");
    if (!$read(250)) return false;

    fputs($socket, "RCPT TO: <" . $to . ">\r\n");
    if (!$read(250)) return false;

    fputs($socket, "DATA\r\n");
    if (!$read(354)) return false;

    $headers  = "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";
    $headers .= "From: " . SITE_NAME . " <" . SMTP_EMAIL . ">\r\n";
    $headers .= "To: {$to}\r\n";
    $headers .= "Subject: {$subject}\r\n";
    if ($reply_to) {
        $headers .= "Reply-To: {$reply_to}\r\n";
    }

    fputs($socket, $headers . "\r\n" . $html_body . "\r\n.\r\n");
    if (!$read(250)) return false;

    fputs($socket, "QUIT\r\n");
    fclose($socket);
    return true;
}
