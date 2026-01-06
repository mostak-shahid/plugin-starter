<?php
/**
 * Feedback Email Template.
 */

// Exit if accessed directly.
if (!defined('ABSPATH')) {
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Feedback Notification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .header {
            background-color: #0073aa;
            color: #fff;
            padding: 20px;
            text-align: center;
        }
        .content {
            background-color: #f9f9f9;
            padding: 20px;
            border: 1px solid #ddd;
        }
        .info-row {
            margin-bottom: 15px;
        }
        .info-label {
            font-weight: bold;
            display: inline-block;
            width: 100px;
        }
        .message-box {
            background-color: #fff;
            padding: 15px;
            border-left: 4px solid #0073aa;
            margin-top: 20px;
        }
        .footer {
            text-align: center;
            padding: 20px;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Feedback Received</h1>
    </div>
    <div class="content">
        <div class="info-row">
            <span class="info-label">From:</span>
            <span><?php echo esc_html($name); ?></span>
        </div>
        <div class="info-row">
            <span class="info-label">Email:</span>
            <span><?php echo esc_html($email); ?></span>
        </div>
        <div class="info-row">
            <span class="info-label">Date:</span>
            <span><?php echo esc_html(current_time('F j, Y g:i a')); ?></span>
        </div>
        <div class="message-box">
            <h3>Message:</h3>
            <p><?php echo nl2br(esc_html($message)); ?></p>
        </div>
    </div>
    <div class="footer">
        <p>This email was sent from <?php echo esc_html(get_bloginfo('name')); ?></p>
        <p><?php echo esc_url(home_url()); ?></p>
    </div>
</body>
</html>