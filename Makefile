EXTENSION_NAME=extension
EXTENSION_DIR=.
OUTPUT_DIR=build

MANIFEST_FILE=$(EXTENSION_DIR)/manifest.json
ZIP_FILE=$(OUTPUT_DIR)/$(EXTENSION_NAME).zip
XPI_FILE=$(OUTPUT_DIR)/$(EXTENSION_NAME).xpi
ICONS_DIR=$(EXTENSION_DIR)/icons

default: extension.xpi

$(OUTPUT_DIR):
	mkdir -p $(OUTPUT_DIR)

$(ZIP_FILE): $(EXTENSION_DIR) $(MANIFEST_FILE) $(wildcard $(ICONS_DIR)/*)
	zip -r $(ZIP_FILE) $(EXTENSION_DIR)/* -x $(EXTENSION_DIR)/Makefile

$(XPI_FILE): $(ZIP_FILE)
	mv $(ZIP_FILE) $(XPI_FILE)

extension.xpi: $(OUTPUT_DIR) $(XPI_FILE)

clean:
	rm -rf $(OUTPUT_DIR)
