EXTENSION_NAME = extension
EXTENSION_DIR = .
SRC_DIR = src
DIST_DIR = dist
OUTPUT_DIR = build

XPI_FILE = $(OUTPUT_DIR)/$(EXTENSION_NAME).xpi
MANIFEST_FILE = $(EXTENSION_DIR)/manifest.json
ICONS_DIR = $(EXTENSION_DIR)/icons
ICON_FILES = $(wildcard $(ICONS_DIR)/*)
SRC_FILES = $(wildcard $(SRC_DIR)/*.ts)
JS_FILES = $(patsubst $(SRC_DIR)/%.ts,$(DIST_DIR)/%.js,$(SRC_FILES))

default: $(XPI_FILE)

$(DIST_DIR):
	mkdir -p $(DIST_DIR)

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

$(XPI_FILE): $(MANIFEST_FILE) $(JS_FILES) $(ICON_FILES) $(OUTPUT_DIR)
	zip -r $(XPI_FILE) $(MANIFEST_FILE) $(DIST_DIR)/* $(ICONS_DIR)

$(JS_FILES): $(SRC_FILES) $(DIST_DIR)
	tsc $(SRC_FILES) --target es2020 --module es2020 --outDir $(DIST_DIR) --strict --skipLibCheck

clean:
	rm -rf $(OUTPUT_DIR) $(DIST_DIR)
