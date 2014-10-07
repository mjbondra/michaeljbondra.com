# Default to development if environment is not set.
saved = environment
if (environment.nil?)
  environment = :development
else
  environment = saved
end

css_dir = "client/css"
sass_dir = "client/scss"
images_dir = "client/img"
generated_images_dir = images_dir + "/generated"
javascripts_dir = "client/js"

# Require any additional compass plugins installed on your system.
require 'breakpoint'
require 'rgbapng'
require 'susy'
require 'sass-globbing'

# You can select your preferred output style here (:expanded, :nested, :compact
# or :compressed).
output_style = (environment == :production) ? :expanded : :nested

# To enable relative paths to assets via compass helper functions. Since Drupal
# themes can be installed in multiple locations, we don't need to worry about
# the absolute path to the theme from the server omega.
relative_assets = true

# Conditionally enable line comments when in development mode.
line_comments = (environment == :production) ? false : true

# Output debugging info in development mode.
sass_options = (environment == :production) ? {} : {:debug_info => true}

# Add the 'sass' directory itself as an import path to ease imports.
add_import_path 'client/scss'
