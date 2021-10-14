# SE2-OfficeQueueSystem #

## v1.0 DB (initial version) ##

DB technology: SQLite

DB editor (lightweight): SQLiteStudio 3.3.3 (download at https://sqlitestudio.pl/)

### DB Structure
Tables:
1. admins: store administrator credentials
  - (int)admin_id: primary key
  - (string)admin_username: admin username (e.g ez_admin)
  - (string)admin_password: hashed pass

2. officers: store officers credentials
  - (int)officer_id: primary key
  - (string)officer_username: officer username (e.g ez_officer)
  - (string)officer_password: hashed pass
  - (int)desk_id: foreign key to show the actual desk that the officer is seated (so when he/she pushes the "call next user" button we know in which desk the user needs to go/was called from; when the officer signs in he/she selects the desk that he/she is seated in)

3. desks: available desks (NOT desk configuration)
  - (int)desk_id: primary key
  - (boolean)desk_open: identify desk status (open/closed) -> use if we want to represent also closed desks, otherwise set always it to true

4. services: available services to the user/customer (also services available to be assigned to any desk)
  - (int)desk_id: primary key
  - (string)service_name: actual service name (e.g certifications/cashier/subscription....any service name)
  - (int)service_time: service time written in MINUTES

5. desks_services: actual desk configuration (correlate desk with the services it offers)
  - (int)desk_id: foreign key
  - (int)desk_id: foreign key

6. tickets: tickets released to users asking for a ticket (source for extracting office waiting queues)
  - (int)ticket_id: primary key, daily unique ticket id
  - (int)service_id: foreign key to the service chosen by the user
  - (int)desk_id: foreign key to the desk that is now calling the user to serve him/her (left empty if user is waiting in queue)
  - (string)ticket_time: ticket release time (string so to store date/time formatted with DayJS)
  - (string)ticket_status: identify ticket status (waiting/served/called; called status is used to show users that are currently being served)



