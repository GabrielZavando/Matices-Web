# Lead Capture Data Model and Integration - Matices B2B

## 1. Data Context and Serverless Decoupling
By operating Astro under a purely Static Site Generation (SSG) model hosted on Hostinger, local database persistence is eliminated to maintain operational costs at $0 USD TCO. The data flow is modeled as a unified conversion payload validated at the client layer.

## 2. Entity Attribute Structure: `B2BLead`

| Technical Field | Data Type | Frontend Rule | Attribute Purpose |
| :--- | :--- | :--- | :--- |
| `name` | String | Required | Nominal lead registry |
| `email` | String | Required (Regex) | Contact and prospecting |
| `phone` | String | Required | Agile B2B coordination |
| `company` | String | Optional | Market segmentation |
| `role` | String | Optional | Profile identification |
| `services_of_interest` | Array[String] | Optional | Specialty routing |
| `organizational_challenges`| Array[String] | Optional | Pre-consultative diagnosis |
| `organization_size` | String | Optional | Size qualification |
| `contact_preference` | String | Optional | Presales alignment |
| `message` | String | Required | Free-text message from the lead |
| `_honeypot` | String | Required (Empty) | Passive anti-spam trap |