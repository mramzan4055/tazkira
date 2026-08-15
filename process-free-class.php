<?php
/**
 * Tazkirah Online Education - Free Trial Class & Plan Registration Form Handler
 */
require_once __DIR__ . '/mail-config.php';

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// 1. Sanitize & Retrieve Inputs
$name        = trim($_POST['name'] ?? '');
$phone       = trim($_POST['phone'] ?? '');
$email       = filter_var(trim($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$plan        = trim($_POST['plan'] ?? '100% Free Trial Class (30-Min Demo - $0)');
$learnerType = trim($_POST['learnerType'] ?? '');
$age         = trim($_POST['age'] ?? '');
$course      = trim($_POST['course'] ?? '');
$timezone    = trim($_POST['timezone'] ?? '');
$teacherPref = trim($_POST['teacherPref'] ?? 'No preference');
$notes       = trim($_POST['notes'] ?? '');

// 2. Validate Required Fields
if (empty($name) || empty($phone) || !$email || empty($course)) {
    echo json_encode([
        'success' => false,
        'message' => 'Please complete all required fields (Name, Phone/WhatsApp, valid Email, and Course choice).'
    ]);
    exit;
}

// 3. Log Submission to JSON file (Guarantees data retention)
$lead_data = [
    'name'        => $name,
    'phone'       => $phone,
    'email'       => $email,
    'plan'        => $plan,
    'learnerType' => $learnerType,
    'age'         => $age,
    'course'      => $course,
    'timezone'    => $timezone,
    'teacherPref' => $teacherPref,
    'notes'       => $notes
];
log_submission('free_trial', $lead_data);

// 4. Send Admin Registration Email Notification
$admin_subject = "🚨 NEW REGISTRATION / TRIAL: {$name} ({$course} - {$plan})";
$admin_body = "
<div style='font-family:Arial,sans-serif;line-height:1.6;color:#1E2422;max-width:600px;margin:0 auto;border:2px solid #C99B43;padding:24px;border-radius:12px;'>
    <div style='background:#041B19;color:#F3D98B;padding:12px 16px;border-radius:8px;margin-bottom:16px;'>
        <h2 style='margin:0;font-size:20px;'>New Free Class & Plan Registration</h2>
    </div>
    <p><strong>Name:</strong> {$name}</p>
    <p><strong>WhatsApp / Phone:</strong> <a href='https://wa.me/" . preg_replace('/[^0-9]/', '', $phone) . "'>{$phone}</a></p>
    <p><strong>Email:</strong> <a href='mailto:{$email}'>{$email}</a></p>
    <p><strong>Selected Plan / Option:</strong> <span style='color:#0B3B39;font-weight:bold;'>{$plan}</span></p>
    <p><strong>Learner Type:</strong> {$learnerType}</p>
    <p><strong>Age / Range:</strong> {$age}</p>
    <p><strong>Selected Course:</strong> {$course}</p>
    <p><strong>Timezone / Location:</strong> {$timezone}</p>
    <p><strong>Teacher Preference:</strong> {$teacherPref}</p>
    <p><strong>Additional Notes:</strong> " . ($notes ? htmlspecialchars($notes) : 'None') . "</p>
    <hr style='border:none;border-top:1px solid #E2D3AC;margin:24px 0;'>
    <p style='font-size:12px;color:#8B9490;'>Submitted on " . date('Y-m-d H:i:s') . " from IP " . ($_SERVER['REMOTE_ADDR'] ?? '127.0.0.1') . ".</p>
</div>";

send_custom_email(RECIPIENT_EMAIL, $admin_subject, $admin_body, $email);

// 5. Send User Confirmation Email
$user_subject = "Your Free Class & Plan Registration Confirmation - Tazkirah";
$user_body = "
<div style='font-family:Arial,sans-serif;line-height:1.6;color:#1E2422;max-width:600px;margin:0 auto;border:1px solid #0B3B39;padding:24px;border-radius:12px;'>
    <h2 style='color:#0B3B39;margin-top:0;'>Assalamu Alaikum {$name},</h2>
    <p>We are delighted to receive your registration for <strong>{$plan}</strong> at Tazkirah Online Education!</p>
    <p>Our academic coordinator will contact you on WhatsApp at <strong>{$phone}</strong> or by email within 2 hours on weekdays to confirm your class schedule and pair you with a certified tutor.</p>
    
    <div style='background:#F9F6F0;border-left:4px solid #C99B43;padding:16px;border-radius:6px;margin:20px 0;'>
        <h4 style='margin:0 0 8px;color:#0B3B39;'>Registration Details:</h4>
        <ul style='margin:0;padding-left:20px;'>
            <li><strong>Selected Option:</strong> {$plan}</li>
            <li><strong>Selected Course:</strong> {$course}</li>
            <li><strong>Timezone:</strong> {$timezone}</li>
        </ul>
    </div>
    
    <p>If you have any questions, feel free to reply directly to this email or chat with us on WhatsApp.</p>
    <p>Warm regards,<br><strong>Tazkirah Academic Team</strong></p>
</div>";

send_custom_email($email, $user_subject, $user_body);

// 6. Return Success Response
if (!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) === 'xmlhttprequest') {
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! We will message you on WhatsApp or email within 2 hours to arrange your class.'
    ]);
    exit;
}

header("Location: free-class.html?status=success");
exit;
