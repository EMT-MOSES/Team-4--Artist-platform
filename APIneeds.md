API Planning Lab Summary
1. Team Partner Roles
Team 3 – Jua Kali Connect
Project Purpose: Connect customers with skilled artisans and service providers.

Downstream Partners (Consumers of Team 3 APIs)

Team 4 (Artist Discovery Platform)
Any system needing artisan, service, booking, review, or training information
Team 4 – Artist Discovery Platform
Project Purpose: Music and event discovery platform for artists, venues, and fans.

Downstream Partners (Consumers of Team 4 APIs)

Team 5 (Campus Lost and Found)
Other systems requiring artist, venue, event, booking, or schedule information
Upstream Partners (APIs Team 4 Consumes)




Team 3 (Jua Kali Connect)
Authentication services
External media/file storage services (if implemented)

Team 5 – Campus Lost and Found
Project Purpose: Help users report, search for, and recover lost items on campus.


Upstream Partners (APIs Team 5 Consumes)

Team 4 (Artist Discovery Platform)
Campus event and venue information providers




2. API Needs Statements
Team 3 – Jua Kali Connect
Downstream API Needs (What Other Teams Need From Team 3)
Artist Discovery Platform needs to read artisan profiles because event organizers may require skilled artisans for event setup and maintenance services.

Artist Discovery Platform needs to read service listings and categories because users need to discover artisans offering specific services such as welding, carpentry, and electrical installation.

Artist Discovery Platform needs to read artisan ratings and reviews because venue managers need trusted information when selecting service providers.

Artist Discovery Platform needs to read booking information because event organizers need to coordinate artisan availability for upcoming events.

Artist Discovery Platform needs to read artisan location information because users need to find artisans operating near event venues and performance locations.

Artist Discovery Platform needs to read training resources because artists and venue managers may be interested in professional development opportunities.

Team 4 – Artist Discovery Platform
Upstream API Needs (APIs Consumed from Team 3)
Artist Discovery Platform needs to read artisan profiles because event organizers may need skilled artisans for event setup and support services.

Artist Discovery Platform needs to read service categories because users need to find artisans based on service type.

Artist Discovery Platform needs to read artisan ratings and reviews because users require quality indicators when selecting service providers.

Artist Discovery Platform needs to read booking availability information because event planners need to determine artisan availability for events.

Downstream API Needs (Provided to Team 5)
Campus Lost and Found needs to read upcoming events because users may want to associate lost items with specific events.

Campus Lost and Found needs to read venue information because users need venue details when reporting where items were lost.

Campus Lost and Found needs to read venue contact information because users may need to contact venue managers regarding lost property.

Campus Lost and Found needs to read venue capacity information because event context may help categorize and prioritize reports.

Campus Lost and Found needs to read artist and event schedules because lost-item reports may need to be filtered by event date and time.

