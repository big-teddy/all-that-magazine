<?php
/**
 * Create Sample Articles for All That Magazine
 *
 * Upload to WordPress root and access via:
 * https://allthatmagazine.com/create-sample-articles.php?secret=create-sample-2024
 */

define('SAMPLE_SECRET', 'create-sample-2024');

// Load WordPress
require_once(__DIR__ . '/wp-load.php');

// Security check
if (!isset($_GET['secret']) || $_GET['secret'] !== SAMPLE_SECRET) {
    die('Unauthorized');
}

// Sample articles data
$sample_articles = [
    [
        'title' => 'The Science of Mindful Breathing: Transform Your Mental Health',
        'content' => '<p>In today\'s fast-paced world, the simple act of breathing mindfully can be a powerful tool for mental wellness. Recent studies from Stanford University have shown that controlled breathing techniques can significantly reduce stress hormones and improve overall emotional regulation.</p>

<p>Dr. Sarah Chen, a leading neuroscientist, explains: "When we engage in mindful breathing, we\'re literally rewiring our brain\'s response to stress. The vagus nerve, which connects the brain to the body, responds immediately to slower, deeper breaths."</p>

<h2>The 4-7-8 Technique</h2>

<p>One of the most effective methods is the 4-7-8 breathing technique:</p>
<ul>
<li>Inhale quietly through your nose for 4 counts</li>
<li>Hold your breath for 7 counts</li>
<li>Exhale completely through your mouth for 8 counts</li>
</ul>

<p>Practice this for just 5 minutes daily, and you\'ll notice improved sleep quality, reduced anxiety, and enhanced focus within two weeks.</p>

<h2>Making It a Habit</h2>

<p>The key to success is consistency. Set a daily reminder on your phone, and choose a specific time—perhaps right after waking up or before bed. Your mind and body will thank you.</p>',
        'excerpt' => 'Discover how simple breathing techniques backed by neuroscience can transform your mental health and reduce stress in just minutes a day.',
        'vertical' => 'wellness',
        'read_time' => 5,
        'is_premium' => false,
        'author_bio' => '<p>Written by our wellness team of certified meditation instructors and mental health professionals.</p>',
        'image_url' => 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1200&h=800&fit=crop'
    ],
    [
        'title' => 'Minimalist Home Design: Less Stuff, More Joy',
        'content' => '<p>The minimalist movement isn\'t just about having less—it\'s about making room for more of what truly matters. Interior designer Marie Kondo revolutionized our thinking about possessions, but modern minimalism goes beyond tidying up.</p>

<p>Today\'s minimalist homes blend functionality with beauty, creating spaces that feel both spacious and warm. The key is intentionality: every item should serve a purpose or bring joy.</p>

<h2>Core Principles of Minimalist Design</h2>

<p><strong>1. Quality Over Quantity</strong><br>
Invest in fewer, better-made pieces. A well-crafted wooden dining table can last generations, while cheap furniture often needs replacing every few years.</p>

<p><strong>2. Neutral Color Palettes</strong><br>
Whites, beiges, and soft grays create a calming atmosphere. Add warmth with natural materials like wood, linen, and wool.</p>

<p><strong>3. Hidden Storage</strong><br>
Modern minimalist homes use clever storage solutions to keep surfaces clear. Built-in cabinets, under-bed storage, and multi-functional furniture are essential.</p>

<h2>Getting Started</h2>

<p>Begin with one room. Remove everything, then only bring back items you truly need or love. You\'ll be amazed at how liberating it feels to let go.</p>',
        'excerpt' => 'Transform your living space into a serene sanctuary with these expert tips on minimalist interior design and intentional living.',
        'vertical' => 'lifestyle',
        'read_time' => 7,
        'is_premium' => false,
        'author_bio' => '<p>Our lifestyle contributors include interior designers, architects, and sustainable living advocates.</p>',
        'image_url' => 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=800&fit=crop'
    ],
    [
        'title' => 'AI Wearables in 2025: Your Health Data, Reimagined',
        'content' => '<p>The latest generation of AI-powered wearables isn\'t just counting steps anymore—they\'re becoming sophisticated health monitoring systems that can predict potential issues before symptoms appear.</p>

<p>The newly released Apple Watch Series 10 and Samsung Galaxy Ring represent a quantum leap in health technology. These devices now offer:</p>

<h2>Revolutionary Features</h2>

<p><strong>Continuous Glucose Monitoring (Non-Invasive)</strong><br>
Using advanced spectroscopy, these wearables can estimate blood glucose levels without any finger pricks. This is a game-changer for diabetics and health-conscious individuals alike.</p>

<p><strong>AI-Powered Health Predictions</strong><br>
Machine learning algorithms analyze patterns in your vital signs, sleep quality, and activity levels to predict potential health issues. The Apple Watch can now detect early signs of respiratory infections 2-3 days before symptoms appear.</p>

<p><strong>Mental Health Monitoring</strong><br>
New stress and anxiety detection features use heart rate variability, skin temperature, and even voice analysis to provide real-time mental health insights.</p>

<h2>Privacy Concerns</h2>

<p>With great data comes great responsibility. Major manufacturers are implementing end-to-end encryption and on-device processing to keep your health data private. However, users should still read privacy policies carefully.</p>

<h2>The Verdict</h2>

<p>These devices are impressive, but they\'re tools, not replacements for professional medical care. Use them to supplement—not substitute—regular checkups with your doctor.</p>',
        'excerpt' => 'Explore how the latest AI-powered wearables are revolutionizing personal health monitoring with predictive analytics and non-invasive tracking.',
        'vertical' => 'tech',
        'read_time' => 8,
        'is_premium' => true,
        'author_bio' => '<p>Tech reviews by our team of engineers, health tech specialists, and early adopters.</p>',
        'image_url' => 'https://images.unsplash.com/photo-1544117519-31a4b719223d?w=1200&h=800&fit=crop'
    ]
];

?>
<!DOCTYPE html>
<html>
<head>
    <title>Create Sample Articles - All That Magazine</title>
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            max-width: 900px;
            margin: 50px auto;
            padding: 20px;
            background: #f5f5f5;
        }
        .container {
            background: white;
            padding: 40px;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            border-bottom: 3px solid #4CAF50;
            padding-bottom: 15px;
        }
        .article {
            margin: 30px 0;
            padding: 20px;
            background: #f9f9f9;
            border-left: 4px solid #2196F3;
            border-radius: 4px;
        }
        .success {
            color: #4CAF50;
            font-weight: bold;
        }
        .error {
            color: #f44336;
            font-weight: bold;
        }
        .info {
            color: #2196F3;
        }
        pre {
            background: #f5f5f5;
            padding: 15px;
            border-radius: 4px;
            overflow-x: auto;
        }
        .meta {
            display: flex;
            gap: 20px;
            margin-top: 10px;
            font-size: 14px;
            color: #666;
        }
        .premium {
            background: #FFF3E0;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 12px;
            font-weight: bold;
            color: #F57C00;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 Creating Sample Articles</h1>

        <?php

        $created = 0;
        $errors = 0;

        foreach ($sample_articles as $article_data) {
            echo '<div class="article">';
            echo '<h3>' . esc_html($article_data['title']) . '</h3>';

            // Get vertical term
            $vertical = get_term_by('slug', $article_data['vertical'], 'vertical');

            if (!$vertical) {
                echo '<p class="error">✗ Vertical "' . $article_data['vertical'] . '" not found!</p>';
                $errors++;
                echo '</div>';
                continue;
            }

            // Create post
            $post_data = array(
                'post_title'    => $article_data['title'],
                'post_content'  => $article_data['content'],
                'post_excerpt'  => $article_data['excerpt'],
                'post_status'   => 'publish',
                'post_type'     => 'article',
                'post_author'   => 1,
            );

            $post_id = wp_insert_post($post_data);

            if (is_wp_error($post_id)) {
                echo '<p class="error">✗ Failed to create article: ' . $post_id->get_error_message() . '</p>';
                $errors++;
                echo '</div>';
                continue;
            }

            // Set vertical
            wp_set_object_terms($post_id, $vertical->term_id, 'vertical');

            // Set ACF fields
            if (function_exists('update_field')) {
                // Featured image - download from Unsplash
                $image_id = null;
                if (!empty($article_data['image_url'])) {
                    $image_id = media_sideload_image($article_data['image_url'], $post_id, $article_data['title'], 'id');

                    if (!is_wp_error($image_id)) {
                        update_field('featured_image', $image_id, $post_id);
                        set_post_thumbnail($post_id, $image_id);
                    }
                }

                update_field('custom_excerpt', $article_data['excerpt'], $post_id);
                update_field('read_time', $article_data['read_time'], $post_id);
                update_field('is_premium', $article_data['is_premium'], $post_id);
                update_field('author_bio', $article_data['author_bio'], $post_id);
            }

            echo '<p class="success">✓ Article created successfully!</p>';
            echo '<div class="meta">';
            echo '<span class="info">ID: ' . $post_id . '</span>';
            echo '<span class="info">Vertical: ' . ucfirst($article_data['vertical']) . '</span>';
            echo '<span class="info">Read Time: ' . $article_data['read_time'] . ' min</span>';
            if ($article_data['is_premium']) {
                echo '<span class="premium">PREMIUM</span>';
            }
            echo '</div>';
            echo '<p><a href="' . get_permalink($post_id) . '" target="_blank">View Article →</a></p>';

            $created++;
            echo '</div>';
        }

        ?>

        <div style="margin-top: 40px; padding: 20px; background: #E8F5E9; border-radius: 8px;">
            <h2>✅ Summary</h2>
            <p><strong>Created:</strong> <?php echo $created; ?> articles</p>
            <p><strong>Errors:</strong> <?php echo $errors; ?></p>

            <?php if ($created > 0): ?>
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
            <h3>Next Steps:</h3>
            <ol>
                <li>Visit <a href="https://allthatmagazine.com" target="_blank">https://allthatmagazine.com</a></li>
                <li>Check <a href="http://localhost:3004" target="_blank">http://localhost:3004</a></li>
                <li><strong>DELETE THIS FILE</strong> for security: <code>create-sample-articles.php</code></li>
            </ol>
            <?php endif; ?>
        </div>
    </div>
</body>
</html>
