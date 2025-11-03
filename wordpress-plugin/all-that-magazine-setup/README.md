# All That Magazine - WordPress Setup Plugin

Automatic WordPress configuration plugin for All That Magazine's headless CMS backend.

## Features

- ✅ Custom Post Type: `article`
- ✅ Custom Taxonomy: `vertical` (Wellness, Lifestyle, Tech)
- ✅ ACF Field Groups with GraphQL support
- ✅ Automatic WordPress settings configuration
- ✅ One-click setup via admin page

## Installation

### Option 1: Upload via WordPress Admin

1. Zip the entire `all-that-magazine-setup` folder
2. Go to WordPress Admin → Plugins → Add New → Upload Plugin
3. Upload the zip file
4. Activate the plugin

### Option 2: Manual Installation

1. Upload the `all-that-magazine-setup` folder to `/wp-content/plugins/`
2. Go to WordPress Admin → Plugins
3. Activate "All That Magazine Setup"

## Required Plugins

Install these plugins before running the setup:

1. **Advanced Custom Fields (ACF)**
   - [Download](https://wordpress.org/plugins/advanced-custom-fields/)
   - Required for custom article fields

2. **WPGraphQL**
   - [Download](https://wordpress.org/plugins/wp-graphql/)
   - Required for GraphQL API

3. **WPGraphQL for Advanced Custom Fields**
   - [Download](https://github.com/wp-graphql/wp-graphql-acf)
   - Required to expose ACF fields in GraphQL

## Usage

1. Install and activate required plugins
2. Go to **Settings → All That Setup**
3. Click "Run Complete Setup" button
4. Verify all checkmarks are green ✅

## What Gets Configured

### Custom Post Type: Article
- Slug: `article`
- GraphQL enabled
- Supports: title, editor, thumbnail, excerpt, author, revisions
- Admin menu icon: Edit Large

### Taxonomy: Vertical
- Slug: `vertical`
- Terms: Wellness, Lifestyle, Tech
- GraphQL enabled
- Shows in admin column

### ACF Fields
All fields are GraphQL-enabled under `articleFields`:

- **Featured Image** (required)
- **Custom Excerpt** (required, max 200 chars)
- **Read Time** (number, minutes)
- **Is Premium** (boolean)
- **Author Bio** (WYSIWYG)

### WordPress Settings
- Permalink structure: `/%postname%/`
- Timezone: Asia/Seoul
- Site tagline: "Premium Wellness Lifestyle Tech"
- Search engines: Discouraged (for development)

## GraphQL Endpoint

After setup, your GraphQL endpoint will be available at:

```
https://your-site.com/graphql
```

Access the GraphQL IDE at:
```
WordPress Admin → GraphQL → GraphiQL IDE
```

## Test Query

Test your setup with this GraphQL query:

```graphql
query TestSetup {
  articles(first: 5) {
    nodes {
      id
      title
      slug
      date
      verticals {
        nodes {
          name
          slug
        }
      }
      articleFields {
        featuredImage {
          sourceUrl
          altText
        }
        customExcerpt
        readTime
        isPremium
        authorBio
      }
    }
  }
}
```

## Troubleshooting

### ACF fields not showing in GraphQL
**Solution:** Ensure WPGraphQL for ACF plugin is activated and ACF field group has `show_in_graphql` enabled.

### Custom post type not appearing
**Solution:** Go to Settings → Permalinks and click "Save Changes" to flush rewrite rules.

### GraphQL endpoint 404
**Solution:**
1. Ensure WPGraphQL plugin is activated
2. Flush permalinks (Settings → Permalinks → Save)
3. Check if GraphQL is enabled in GraphQL settings

## File Structure

```
all-that-magazine-setup/
├── all-that-magazine-setup.php          (main plugin file)
├── includes/
│   ├── class-post-types.php             (article CPT)
│   ├── class-taxonomies.php             (vertical taxonomy)
│   ├── class-acf-fields.php             (ACF field groups)
│   ├── class-settings.php               (WordPress settings)
│   └── class-admin-page.php             (admin UI)
├── assets/
│   └── css/
│       └── admin.css                    (admin styles)
└── README.md
```

## Version

**1.0.0** - Initial release

## Requirements

- WordPress 6.0 or higher
- PHP 8.0 or higher
- ACF plugin
- WPGraphQL plugin
- WPGraphQL for ACF plugin

## License

GPL v2 or later

## Support

For issues or questions, please contact All That Magazine support or refer to the project documentation.

## Next Steps

After successful setup:

1. ✅ Create sample articles in WordPress
2. ✅ Assign verticals to articles
3. ✅ Upload featured images
4. ✅ Test GraphQL queries
5. ✅ Configure Next.js frontend to connect to this WordPress backend

---

**Made for All That Magazine** - Premium Wellness Lifestyle Tech
