# Hörby Bilverkstad

En enkel fullstack-prototyp med React-frontend och Java/Spring Boot-backend.

## Kör backend

```bash
cd backend
mvn spring-boot:run
```

Backend startar på `http://localhost:8080`.

Som standard använder backend en lokal H2-databasfil i `backend/data/`. För Supabase
sätter du miljövariabler innan du startar:

```bash
export DATABASE_URL='jdbc:postgresql://aws-0-eu-north-1.pooler.supabase.com:6543/postgres?sslmode=require'
export DATABASE_USERNAME='postgres.wwqeqpxlvapekqsdzqxe'
export DATABASE_PASSWORD='DITT_SUPABASE_DATABASE_PASSWORD'
export DATABASE_DRIVER='org.postgresql.Driver'
mvn spring-boot:run
```

Byt host/username om Supabase visar andra värden i dashboarden.

## Kör frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend startar på `http://localhost:5173` och proxar `/api` till backend.

## API

`POST /api/bookings`

```json
{
  "service": "Felsökning",
  "registrationNumber": "ABC123",
  "description": "Motorlampan lyser och bilen går ojämnt",
  "phone": "070-123 45 67",
  "preferredDate": "2026-05-05"
}
```

`GET /api/bookings`

Returnerar sparade bokningar från den konfigurerade databasen.
