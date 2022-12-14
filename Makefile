# Makefile
OUTPUT=gen
NPM_BIN=$(shell npm bin)
GRPC_TOOL=$(NPM_BIN)/grpc_tools_node_protoc
TYPESCRIPT_PLUGIN=protoc-gen-ts=$(NPM_BIN)/protoc-gen-ts
COMMAND=$(GRPC_TOOL) --plugin=${TYPESCRIPT_PLUGIN} --js_out=import_style=commonjs,binary:$(OUTPUT) --ts_out=$(OUTPUT) -I ./proto ./proto/*.proto

.PHONY: protogen
protogen:
	rm -rf $(OUTPUT) && mkdir -p $(OUTPUT)
	$(COMMAND)
