FROM ruby:3.2.2

# fixed env vars
ENV LANG=C.UTF-8
ENV TZ=Asia/Tokyo

# install deps
RUN apt-get update -qq && apt-get install -y default-mysql-client vim
ENV EDITOR=vim

# bundle install
WORKDIR /tretter
RUN gem uninstall bundler && gem install bundler -v '2.3.13'
ENV BUNDLE_PATH=/tretter/vendor/bundle

# start process for development
ENTRYPOINT [ "/entrypoint.sh" ]
CMD ["bash"]