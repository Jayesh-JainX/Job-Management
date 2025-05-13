
create table jobs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  company_name text not null,
  location text not null,
  job_type text not null check (job_type in ('Full-time', 'Part-time', 'Contract', 'Internship')),
  salary_range_min integer not null check (salary_range_min >= 0),
  salary_range_max integer not null check (salary_range_max >= salary_range_min),
  description text not null,
  requirements text not null,
  responsibilities text not null,
  application_deadline timestamp with time zone not null,
  created_at timestamp with time zone default now() not null,
  updated_at timestamp with time zone default now() not null,
  company_logo text,

  constraint jobs_title_check check (char_length(title) > 0),
  constraint jobs_company_name_check check (char_length(company_name) > 0)
);


create index jobs_title_idx on jobs using gin(to_tsvector('english', title));
create index jobs_location_idx on jobs(location);
create index jobs_job_type_idx on jobs(job_type);
create index jobs_salary_range_min_idx on jobs(salary_range_min);
create index jobs_salary_range_max_idx on jobs(salary_range_max);
create index jobs_application_deadline_idx on jobs(application_deadline);

create function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger update_jobs_updated_at
  before update on jobs
  for each row
  execute function update_updated_at_column();