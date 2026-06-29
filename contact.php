<?php

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Please check the required fields and try again.'
    ]);
    exit;
}

$recipientEmail = 'hello@maisontub.com';
$siteName = 'MaisonTub';
$fromEmail = 'no-reply@maisontub.com';

function json_response(bool $success, string $message, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode([
        'success' => $success,
        'message' => $message
    ]);
    exit;
}

function clean_text(?string $value): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', ' ', $value);
    $value = preg_replace('/\s+/', ' ', $value);

    return trim($value);
}

function clean_message(?string $value): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace('/\r\n|\r|\n/', "\n", $value);
    $value = preg_replace('/[ \t]+/', ' ', $value);

    return trim($value);
}

function has_header_injection(string $value): bool
{
    return (bool) preg_match('/[\r\n]/', $value);
}

$honeypot = clean_text($_POST['website'] ?? '');

if ($honeypot !== '') {
    json_response(true, 'Thank you. Your request has been received.');
}

$fullName = clean_text($_POST['fullName'] ?? '');
$email = clean_text($_POST['email'] ?? '');
$phone = clean_text($_POST['phone'] ?? '');
$service = clean_text($_POST['service'] ?? '');
$message = clean_message($_POST['message'] ?? '');
$sourcePage = clean_text($_POST['sourcePage'] ?? 'Unknown page');
$privacyConsent = clean_text($_POST['privacyConsent'] ?? '');

$ipAddress = $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unknown user agent';

if (
    $fullName === '' ||
    $email === '' ||
    $phone === '' ||
    $service === '' ||
    $message === '' ||
    $privacyConsent !== 'yes'
) {
    json_response(false, 'Please check the required fields and try again.', 422);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(false, 'Please check the required fields and try again.', 422);
}

if (
    has_header_injection($fullName) ||
    has_header_injection($email) ||
    has_header_injection($phone) ||
    has_header_injection($service)
) {
    json_response(false, 'Please check the required fields and try again.', 422);
}

if (mb_strlen($fullName) > 120 || mb_strlen($email) > 160 || mb_strlen($phone) > 60 || mb_strlen($service) > 180) {
    json_response(false, 'Please check the required fields and try again.', 422);
}

if (mb_strlen($message) > 4000) {
    json_response(false, 'Please shorten your message and try again.', 422);
}

$subject = 'New MaisonTub Walk-In Tub Request';

$emailBody = <<<EMAIL
New MaisonTub request received.

Contact Details
---------------
Full Name: {$fullName}
Email: {$email}
Phone: {$phone}

Request Details
---------------
Selected Service: {$service}
Source Page: {$sourcePage}

Message:
{$message}

Consent
-------
Privacy Consent: {$privacyConsent}

Platform Notice
---------------
MaisonTub is an independent provider-matching platform. MaisonTub does not install, sell, repair, inspect, manufacture, or directly provide walk-in tub services. Final pricing, scheduling, warranties, licensing, insurance, product models, and service terms are provided by participating providers.

Technical Details
-----------------
IP Address: {$ipAddress}
User Agent: {$userAgent}

EMAIL;

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'From: ' . $siteName . ' <' . $fromEmail . '>',
    'Reply-To: ' . $fullName . ' <' . $email . '>',
    'X-Mailer: PHP/' . phpversion()
];

$mailSent = @mail(
    $recipientEmail,
    $subject,
    $emailBody,
    implode("\r\n", $headers)
);

if (!$mailSent) {
    json_response(false, 'Please check the required fields and try again.', 500);
}

json_response(true, 'Thank you. Your request has been received.');
