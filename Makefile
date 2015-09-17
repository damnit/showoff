.PHONY: status

status:
	@echo TODOS:
	@echo - integrate travis
	@echo - add example app using metalsmith skeleton
	@echo - write some unit tests
	@echo - publish to bower

develop:
	@bower install
	@npm install

test: develop
	@npm test
