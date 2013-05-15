
test:
	@./node_modules/.bin/mocha \
		--require should \
		--bail

.PHONY: test
