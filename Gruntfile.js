module.exports = function ( grunt ) {
	// Auto-load the needed grunt tasks
	// require('load-grunt-tasks')(grunt);
	require( 'load-grunt-tasks' )( grunt, { pattern: ['grunt-*'] } );

	var config = {
		tmpdir:                  '.tmp/',
		phpFileRegex:            '[^/]+\.php$',
		phpFileInSubfolderRegex: '.*?\.php$',
		themeSlug:               'consulting-lite',
	};

	// configuration
	grunt.initConfig( {
		pgk: grunt.file.readJSON( 'package.json' ),

		config: config,

		// https://github.com/sindresorhus/grunt-sass
		sass: {
			options: {
				outputStyle:    'compact',
				sourceMap:      true,
				includePaths:   ['bower_components/bootstrap/scss', 'bower_components/slick-carousel/slick']
			},
			build: {
				files: [{
					expand: true,
					cwd:    'assets/sass/',
					src:    '*.scss',
					ext:    '.css',
					dest:   config.tmpdir,
				}]
			}
		},

		// Apply several post-processors to your CSS using PostCSS.
		// https://github.com/nDmitry/grunt-postcss
		postcss: {
			autoprefix: {
				options: {
					map: true,
					processors: [
						require('autoprefixer')({
							browsers: ['last 2 versions', 'ie 10', 'ie 11', 'Safari >= 8']
						}),
					]
				},
				files: [{
					expand: true,
					cwd:    config.tmpdir,
					src:    '*.css',
					dest:   './',
				}]
			},
		},

		// https://npmjs.org/package/grunt-contrib-watch
		watch: {
			livereload: {
				options: {
					livereload: true,
				},
				files: ['**/*.php', 'assets/js/**/*.js', '*.css'],
			},

			// compile scss
			sass: {
				options: {
					atBegin: true,
				},
				files:   ['assets/sass/**/*.scss'],
				tasks:   ['sass:build'],
			},

			// autoprefix the files
			postcss: {
				options: {
					atBegin: true,
				},
				files: ['<%= config.tmpdir %>*.css'],
				tasks: ['postcss:autoprefix'],
			},
		},

		// requireJS optimizer
		// https://github.com/gruntjs/grunt-contrib-requirejs
		requirejs: {
			build: {
				// Options: https://github.com/jrburke/r.js/blob/master/build/example.build.js
				options: {
					baseUrl:                 '',
					mainConfigFile:          'assets/js/main.js',
					optimize:                'uglify2',
					preserveLicenseComments: false,
					useStrict:               true,
					wrap:                    true,
					name:                    'bower_components/almond/almond',
					include:                 'assets/js/main',
					out:                     'assets/js/main.min.js'
				}
			}
		},

		// https://github.com/gruntjs/grunt-contrib-copy
		copy: {
			// create new directory for deployment
			build: {
				expand: true,
				dot:    false,
				dest:   config.themeSlug + '/',
				src:    [
					'*.css',
					'*.php',
					'screenshot.{jpg,png}',
					'readme.txt',
					'Gruntfile.js',
					'composer.json',
					'composer.lock',
					'package.json',
					'bower.json',
					'wpml-config.xml',
					'assets/**',
					'template-parts/**',
					'bower_components/picturefill/dist/picturefill.min.js',
					'bower_components/requirejs/require.js',
					'bower_components/bootstrap/js/dist/**',
					'bower_components/font-awesome/css/font-awesome.min.css',
					'bower_components/font-awesome/fonts/**',
					'inc/**',
					'vendor/**'
				],
				flatten: false
			}
		},

		// https://github.com/gruntjs/grunt-contrib-clean
		clean: {
			build: [
				config.themeSlug + '/vendor/mexitek/phpcolors/demo',
				config.themeSlug + '/vendor/mexitek/phpcolors/test',
				config.themeSlug + '/vendor/mexitek/phpcolors/README.md',
			]
		},

		// https://github.com/gruntjs/grunt-contrib-compress
		compress: {
			build: {
				options: {
					archive: config.themeSlug + '.zip',
					mode:    'zip'
				},
				src: config.themeSlug + '/**'
			}
		},

		// https://www.npmjs.com/package/grunt-wp-i18n
		addtextdomain: {
			options: {
				updateDomains: true
			},
			target: {
				files: {
					src: [
						'*.php',
						'inc/**/*.php',
						'template-parts/*.php',
						'vendor/proteusthemes/**/*.php',
					]
				}
			}
		},

		// https://github.com/yoniholmes/grunt-text-replace
		replace: {
			theme_version: {
				src:          ['style.{,min.}css'],
				overwrite:    true,
				replacements: [{
					from: '0.0.0-tmp',
					to:   function () {
						grunt.option( 'version_replaced_flag', true );
						return grunt.option( 'longVersion' );
					}
				}],
			},
			tgmpaIssue: {
				src: 'vendor/tgmpa/tgm-plugin-activation/class-tgm-plugin-activation.php',
				overwrite: true,
				replacements: [{
					from: "else {\n				$this->page_hook = call_user_func( 'add_submenu_page', $args['parent_slug'], $args['page_title'], $args['menu_title'], $args['capability'], $args['menu_slug'], $args['function'] );\n			}",
					to: ''
				}]
			}
		},

		// https://github.com/ahmednuaman/grunt-scss-lint
		// https://github.com/brigade/scss-lint#disabling-linters-via-source
		// config file: https://github.com/brigade/scss-lint/blob/master/config/default.yml
		scsslint: {
			allFiles: [
				'assets/sass/**/*.scss',
			],
			options: {
				// bundleExec: true,
				config: '.scss-lint.yml',
				// reporterOutput: 'scss-lint-report.xml',
				colorizeOutput: true
			},
		},

		// https://github.com/gruntjs/grunt-contrib-jshint
		// http://jshint.com/docs/options/
		jshint: {
			options: {
				curly:   true,
				bitwise: true,
				eqeqeq:  true,
				freeze:  true,
				unused:  true,
				undef:   true,
				browser: true,
				globals: {
					jQuery:               true,
					Modernizr:            true,
					ConsultingLiteVars:           true,
					ConsultingLiteSliderCaptions: true,
					module:               true,
					define:               true,
					require:              true,
				}
			},
			allFiles: [
				'Gruntfile.js',
				'assets/js/*.js',
				'!assets/js/{modernizr,fix.}*',
				'!assets/js/*.min.js',
			]
		},

	} );

	// when developing
	grunt.registerTask( 'default', [
		'watch',
	] );

	// build assets
	grunt.registerTask( 'build', [
		'sass:build',
		'postcss:autoprefix',
		'requirejs:build',
	] );

	// CI
	// build assets
	grunt.registerTask( 'ci', 'Builds all assets on the CI, needs to be called with --theme_version arg.', function () {
		// get theme version, provided from cli
		var version = grunt.option( 'theme_version' ) || null;

		// check if version is string and is in semver.org format (at least a start)
		if ( 'string' === typeof version && /^v\d{1,2}\.\d{1,2}\.\d{1,2}/.test( version ) ) { // regex that version starts like v1.2.3
			var longVersion = version.substring( 1 ).trim(),
				tasksToRun = [
					'build',
					'replace:theme_version',
					'replace:tgmpaIssue',
					'addtextdomain'
				];

			grunt.option( 'longVersion', longVersion );

			if ( /^\d{1,2}\.\d{1,2}\.\d{1,2}(-RC\d)?$/.test( longVersion ) ) { // perform TF update, add flag file
				grunt.log.writeln( 'Uploading a theme to the TF' );
				grunt.log.writeln( '===========================' );

				if ( grunt.file.isFile( './deploy-zipball' ) ) {
					grunt.fail.warn( 'File for flagging TF build already exists.', 1 );
				}
				else {
					// write a dummy file, if this one exists later on build a zip for the TF
					grunt.file.write( './deploy-zipball', 'lets go!' );
				}
			}

			grunt.task.run( tasksToRun );
		}
		else {
			grunt.fail.warn( 'Version to be replaced in style.css is not specified or valid.\nUse: grunt <your-task> --theme_version=v1.2.3\n', 3 );
		}
	} );

	// create installable zip
	grunt.registerTask( 'zip', [
		'copy:build',
		'addtextdomain',
		'clean:build',
		'compress:build',
	] );

	// lint the code
	grunt.registerTask( 'lint', [
		'scsslint',
		'jshint',
	] );
};
