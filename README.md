# README
## Welcom to tretter!!
- tretter is able to create your efficiently time.
## how to build environment
- 開発環境でのキャッシュの有効化
```
touch backend/tmp/caching-dev.txt
```
- preparing with docker compose(Rails)
```
docker-compose build tretter_rails

docker-compose run --rm tretter_rails bundle install
docker-compose run --rm tretter_rails bundle exec rails db:create
docker-compose run --rm tretter_rails bundle exec rails db:migrate
```
- container image build
```
docker-compose build tretter
```
- All container execute
```
docker compose up -d
```
