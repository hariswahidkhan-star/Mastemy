# Microsoft AZ-700: Azure Network Engineer Associate

> **Full curriculum specification - not finished lesson content, scripts or videos.** `MST-0165` v0.1.0 | Batch 5 | workflow: Blueprint review | approval: draft

| Field | Value |
|---|---|
| Course class | independent-certification-exam-prep |
| Issuer | Microsoft (no affiliation or endorsement) |
| Exam code | AZ-700 |
| Version basis | Skills measured as of July 27, 2026 |
| Evidence | **verified-official-source** - sources: SRC-MS-AZ700 (https://learn.microsoft.com/credentials/certifications/resources/study-guides/az-700) |
| Legacy IDs | MST-MIC-MS-AZ700-001 |
| Planned time | T = 1875 min; instruction I = 1500 min (80%); assessment A = 375 min (20%) |
| Assessment split | lesson checks 80 / module checks 175 / cumulative 120 min |
| Certificate | Completion of independent preparation course; does not award the external professional certification or license. (module checks >= 75%, final >= 80%) |

## Learning outcomes

1. Apply the objectives of 'Design and implement core networking infrastructure' to the depth the official outline requires
2. Apply the objectives of 'Design, implement, and manage connectivity services' to the depth the official outline requires
3. Apply the objectives of 'Design and implement application delivery services' to the depth the official outline requires
4. Apply the objectives of 'Design and implement private access to Azure services' to the depth the official outline requires
5. Apply the objectives of 'Design and implement Azure network security services' to the depth the official outline requires

## What this course assesses / does not assess

- Assesses: knowledge and applied reasoning on every in-scope outcome, using single-answer MCQ and multiple-answer selection only.
- Does not assess: Knowledge-practice forms use MCQ/MR only; official item formats not reproducible in this format are listed in the exam-version record.

## Modules

### M01 Design and implement core networking infrastructure (25–30%)

- Worked applications: (1) Plan non-overlapping address spaces and subnet delegation; (2) Configure Azure DNS Private Resolver for hybrid name resolution
- Common misconception addressed: Assuming two peered VNets can share overlapping IP ranges
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M01L01 | Design and implement IP addressing for Azure resources | 94 | 6 |
| M01L02 | Design and implement name resolution | 94 | 6 |
| M01L03 | Design and implement VNet connectivity and routing | 94 | 6 |
| M01L04 | Monitor networks | 94 | 6 |

### M02 Design, implement, and manage connectivity services (20–25%)

- Worked applications: (1) Choose policy-based vs route-based for a site-to-site VPN; (2) Design ExpressRoute with Global Reach for DR
- Common misconception addressed: Confusing a point-to-site with a site-to-site VPN gateway SKU
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M02L01 | Design, implement, and manage a site-to-site VPN connection | 94 | 6 |
| M02L02 | Design, implement, and manage a point-to-site VPN connection | 94 | 6 |
| M02L03 | Design, implement, and manage Azure ExpressRoute | 94 | 6 |
| M02L04 | Design and implement an Azure Virtual WAN architecture | 94 | 6 |

### M03 Design and implement application delivery services (15–20%)

- Worked applications: (1) Pick Load Balancer vs Application Gateway vs Front Door for an app; (2) Configure WAF rule sets on Front Door
- Common misconception addressed: Treating a regional load balancer as a global traffic solution
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M03L01 | Design and implement Azure Load Balancer and Azure Traffic Manager | 94 | 6 |
| M03L02 | Design and implement Azure Application Gateway | 94 | 6 |
| M03L03 | Design and implement Azure Front Door | 94 | 6 |

### M04 Design and implement private access to Azure services (10–15%)

- Worked applications: (1) Create a private endpoint and integrate it with private DNS; (2) Choose a service endpoint vs a private endpoint
- Common misconception addressed: Believing a service endpoint gives a private IP like a private endpoint
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M04L01 | Design and implement Azure Private Link service and private endpoints | 94 | 6 |
| M04L02 | Design and implement service endpoints | 93 | 6 |

### M05 Design and implement Azure network security services (15–20%)

- Worked applications: (1) Author NSG inbound/outbound rules with application security groups; (2) Deploy Azure Firewall in a Virtual WAN secure hub
- Common misconception addressed: Assuming an NSG and Azure Firewall provide identical filtering
- Module check: 35 items / 35 min, threshold 75%

| Lesson | Title | Instruction min | Lesson-check items |
|---|---|---|---|
| M05L01 | Implement and manage network security groups | 93 | 6 |
| M05L02 | Design and implement Azure Firewall and Azure Firewall Manager | 93 | 6 |
| M05L03 | Design and implement a Web Application Firewall (WAF) deployment | 93 | 6 |

## Integrative case

A retailer runs a web tier plus hybrid on-prem connectivity in Azure. Design the network: address plan and subnets, hybrid link (VPN or ExpressRoute), global app delivery (Front Door/App Gateway), private access to PaaS data stores, and layered security (NSG, Azure Firewall, WAF); justify SKU choices to the architect.

## Cumulative assessment

Form length basis: DESIGN ASSUMPTION - the study guide does not state platform question count or duration; confirm on the exam details page.

| Form | Items | Minutes | Required (counted in T) |
|---|---|---|---|
| MST-0165-practice-form-A | 45 | 45 | yes |
| MST-0165-practice-form-B | 45 | 45 | no (optional practice) |
| MST-0165-practice-form-C | 45 | 45 | no (optional practice) |
| MST-0165-final-protected | 45 | 45 | yes |

| Domain | Items per form |
|---|---|
| Design and implement core networking infrastructure | 13 |
| Design, implement, and manage connectivity services | 10 |
| Design and implement application delivery services | 8 |
| Design and implement private access to Azure services | 6 |
| Design and implement Azure network security services | 8 |

Minimum reviewed item bank: 722 (plan; 3 sample items drafted, 0 reviewed).

## Sample items (original, draft, unreviewed)

**MST-0165-Q0001** (single-answer, Select ONE) An app needs a private IP inside a VNet to reach an Azure Storage account so traffic never traverses the public endpoint. Which feature do you use?

- A. A private endpoint (Azure Private Link) **(key)**  
  _Rationale:_ Correct: a private endpoint projects the PaaS service into the VNet with a private IP.
- B. A service endpoint  
  _Rationale:_ A service endpoint keeps traffic on the Azure backbone but does not give the service a private IP in your VNet.
- C. A public IP prefix  
  _Rationale:_ A public IP prefix allocates public addresses, the opposite of private access.
- D. A NAT gateway  
  _Rationale:_ NAT gateway provides outbound SNAT; it does not privatize access to a PaaS service.

**MST-0165-Q0002** (single-answer, Select ONE) Which gateway type is required to connect an entire on-premises site to an Azure VNet over IPsec?

- A. A site-to-site VPN gateway **(key)**  
  _Rationale:_ Correct: site-to-site connects a whole on-prem network to Azure over IPsec/IKE.
- B. A point-to-site VPN gateway  
  _Rationale:_ Point-to-site connects individual client devices, not a whole site.
- C. An application gateway  
  _Rationale:_ Application Gateway is a layer-7 load balancer, not a cross-premises VPN.
- D. A NAT gateway  
  _Rationale:_ NAT gateway handles outbound address translation only.

**MST-0165-Q0003** (multiple-answer, Select TWO) Which TWO services can filter and protect inbound HTTP/S application traffic with a Web Application Firewall policy? (Select TWO.)

- A. Azure Front Door **(key)**  
  _Rationale:_ Correct: WAF policies can be attached to Azure Front Door.
- B. Azure Application Gateway **(key)**  
  _Rationale:_ Correct: Application Gateway supports WAF policies for layer-7 protection.
- C. Azure Route Server  
  _Rationale:_ Route Server exchanges BGP routes; it does not run a WAF.
- D. A network security group  
  _Rationale:_ An NSG filters by IP/port, not by HTTP inspection with a WAF ruleset.
- E. Azure Bastion  
  _Rationale:_ Bastion provides secure RDP/SSH, not web application firewalling.

## Package files

`course_metadata.json`, `syllabus.csv`, `outcome_coverage.csv`, `assessments/forms.json`, `assessments/question_bank.json`, `youtube_asset_manifest.csv`, `qa_report.md`. No `lessons/` folder exists yet because no scripts, storyboards, notes or captions have been written.
