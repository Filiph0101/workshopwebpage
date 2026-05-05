# Hörby Bilverkstad

En enkel fullstack-prototyp med React-frontend och Java/Spring Boot-backend.

## Kör backend

```bash
cd backend
mvn spring-boot:run
```

Backend startar på `http://localhost:8080`.

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

Returnerar bokningar som finns i minnet under tiden backendprocessen kör.
