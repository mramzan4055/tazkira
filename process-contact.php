<?php
/**
 * Tazkirah Online Education - Contact Form Handler
 */
require_once __DIR__ . '/mail-config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// 1. Sanitize & Retrieve Inputs
$name    = trim($_POST['name'] ?? '');
$email   = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$subject = trim($_POST['subject'] ?? 'General Inquiry');
$message = trim($_POST['message'] ?? '');

// 2. Validate Required Fields
if (empty($name) || !$email || empty($message)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please fill in all required fields (Name, valid Email, and Message).'
    ]);
    exit;
}

// 3. Log Submission to JSON file (Guarantees data retention)
$lead_data = [
    'name'    => $name,
    'email'   => $email,
    'subject' => $subject,
    'message' => $message,
];
log_submission('contact', $lead_data);

// 4. Send Admin Notification Email
$admin_subject = "New Contact Inquiry from {$name}: {$subject}";
$admin_body = "
<div style='font-family:Arial,sans-serif;line-height:1.6;color:#1E2422;max-width:600px;margin:0 auto;border:1px solid #E2D3AC;padding:24px;border-radius:12px;'>
    <h2 style='color:#0B3B39;margin-top:0;'>New Contact Inquiry</h2>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
    <p><strong>Subject:</strong> {$subject}</p>
    <p><strong>Message:</strong></p>
    <div style='background:#F9F6F0;padding:16px;border-radius:8px;border-left:4px solid #C99B43;'>
        " . nl2br(htmlspecialchars($message)) . "
    </div>
    <hr style='border:none;border-top:1px solid #E2D3AC;margin:24px 0;'>
    <p style='font-size:12px;color:#8B9490;'>This lead was submitted on " . date('Y-m-d H:i:s') . " from IP " . ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1') . ".</p>
</div>";

send_custom_email(RECIPIENT_EMAIL, $admin_subject, $admin_body, $email);

// 5. Send User Auto-reply Confirmation
$user_subject = "Thank you for contacting Tazkirah Online Education";
$user_body = "
<div style='font-family:Arial,sans-serif;line-height:1.6;color:#1E2422;max-width:600px;margin:0 auto;border:1px solid #0B3B39;padding:24px;border-radius:12px;'>
    <h2 style='color:#0B3B39;margin-top:0;'>Assalamu Alaikum {$name},</h2>
    <p>Thank you for reaching out to <strong>Tazkirah Online Education</strong>.</p>
    <p>We have received your message regarding <strong>\"{$subject}\"</strong> and an academic coordinator will get back to you within 2 hours on weekdays.</p>
    <div style='background:#EFF6F5;padding:16px;border-radius:8px;margin:20px 0;'>
        <p style='margin:0;color:#0B3B39;font-weight:bold;'>Need immediate assistance?</p>
        <p style='margin:4px 0 0;'>You can chat with our support team on WhatsApp at <a href='https://wa.me/17074154469' style='color:#17847A;'>+1 (707) 415-4469</a>.</p>
    </div>
    <p>Warm regards,<br><strong>Tazkirah Academic Team</strong></p>
</div>";

send_custom_email($email, $user_subject, $user_body);

// 6. Return Clean Success Response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! We have received your message and will reply within 2 hours on weekdays.'
    ]);
    exit;
}

// Fallback redirect for plain form POSTs
header("Location: contact.html?status=success#contact-form-status");
exit;
