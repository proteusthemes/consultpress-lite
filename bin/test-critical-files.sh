#!/bin/bash -ex
#
# First argument $1 should be folder name. Default: './'
# Exist codes:
# - 0: OK
# - 1: file missing
# - 2: folder missing

function testRequiredFiles {
	parentFolder='./'
	requiredFiles=(
		index.php
		functions.php
		style.css
		template-parts/content.php
		screenshot.png
		readme.txt
		assets/js/modernizr.custom.20160801.js
		assets/js/main.min.js
		bower_components/font-awesome/fonts/fontawesome-webfont.woff2
		vendor/proteusthemes/wai-aria-walker-nav-menu/wai-aria.js
	)
	requiredFolders=(
		assets/sass
		bower_components
		bower_components/font-awesome/fonts
		inc
		inc/customizer
		vendor
	)

	# check for parentFolder arg
	if [[ -n $1 ]]; then
		parentFolder=$1
	fi

	# loop for files
	for file in "${requiredFiles[@]}"
	do
		filePath="$parentFolder/$file"
		if [[ ! -f $filePath ]]; then
			echo "File $filePath does not exist!"
			exit 1
		fi
	done

	# loop for directorieswp_register
	for folder in "${requiredFolders[@]}"
	do
		folderPath="$parentFolder/$folder"
		if [[ ! -d $folderPath ]]; then
			echo "Directory $folderPath does not exist!"
			exit 2
		fi
	done
}

# call and unset
testRequiredFiles "$*"
unset testRequiredFiles
