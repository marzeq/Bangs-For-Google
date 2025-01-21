EXTENSION_NAME = extension
EXTENSION_DIR = .
OUTPUT_DIR = build

XPI_FILE_NAME=$(EXTENSION_NAME).xpi
XPI_FILE = $(OUTPUT_DIR)/$(EXTENSION_NAME).xpi
MANIFEST_FILE = $(EXTENSION_DIR)/manifest.json
ICONS_DIR = $(EXTENSION_DIR)/icons
ICON_FILES = $(wildcard $(ICONS_DIR)/*)
SRC_FILES = $(wildcard $(EXTENSION_DIR)/*.js)

default: $(XPI_FILE)

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

$(XPI_FILE): $(MANIFEST_FILE) $(SRC_FILES) $(ICON_FILES) | $(OUTPUT_DIR)
	web-ext build -i build/** .prettierrc.toml Makefile -n $(XPI_FILE_NAME)
	mv web-ext-artifacts/* $(OUTPUT_DIR)
	rm -rf web-ext-artifacts

clean:
	rm -rf $(OUTPUT_DIR)

