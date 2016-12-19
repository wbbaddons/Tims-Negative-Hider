WCF_FILES = $(shell find files_wcf -type f)

all: be.bastelstu.wcf.hideDisliked.tar

be.bastelstu.wcf.hideDisliked.tar: files_wcf.tar *.xml LICENSE
	tar cvf be.bastelstu.wcf.hideDisliked.tar --numeric-owner --exclude-vcs -- files_wcf.tar *.xml LICENSE

files_wcf.tar: $(WCF_FILES)
	tar cvf files_wcf.tar --numeric-owner --exclude-vcs --exclude .babelrc --transform='s,^files_wcf/,,' -- $+

clean:
	-rm -f files_wcf.tar

distclean: clean
	-rm -f be.bastelstu.wcf.hideDisliked.tar

.PHONY: distclean clean
