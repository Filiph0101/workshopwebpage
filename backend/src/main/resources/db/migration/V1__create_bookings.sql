create table bookings (
  id uuid primary key,
  service varchar(120) not null,
  registration_number varchar(12) not null default '',
  description text not null,
  phone varchar(30) not null,
  preferred_date date,
  created_at timestamp with time zone not null
);

create index idx_bookings_created_at on bookings (created_at desc);
