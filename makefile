start:
	docker compose up -d

stop:
	docker compose down
	docker rmi helpdesk-js-app:latest
	docker volume rm helpdesk-js_db-data
