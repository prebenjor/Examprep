import type { Question } from '../types'

export const screenshotQuestions: Question[] = [
  {
    "id": "source-t1-023",
    "number": 23,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A Configuration Manager needs to restrict the number of classes available in a Configuration Item reference field on an incident form\nHow does the Manager set Principal Classes?",
    "choices": [
      {
        "id": "A",
        "text": "By using the Principal Class check box on the Ci Class Manager's 'Basic Info' tab for a Class"
      },
      {
        "id": "B",
        "text": "By using the Principal Class check box on the CI Class Manager's 'Attributes' tab for a Class"
      },
      {
        "id": "C",
        "text": "By using the Principal Class attribute on the CI"
      },
      {
        "id": "D",
        "text": "By using the Principal Class check box on the CMDB Workspace"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image147.png",
    "needsReview": false
  },
  {
    "id": "source-t1-024",
    "number": 24,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A CMDB Administrator aims to utilize CSDM life cycle field mappings to better align with CSDM best practices.\nWhat is the next step to take after selecting the Enable Life Cycle Sync button?",
    "choices": [
      {
        "id": "A",
        "text": "Resolve any incomplete field mappings identified in the Discrepancy Report"
      },
      {
        "id": "B",
        "text": "Fix the incorrect values in the Life Cycle Stage to match legacy values"
      },
      {
        "id": "C",
        "text": "Activate the CSDM Life Cycle field mappings"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image134.png",
    "needsReview": false
  },
  {
    "id": "source-t1-025",
    "number": 25,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A CMDB Administrator needs to set a CI Class as a Principal Class.\nWhich CI Class Manager tab would need to be accessed?",
    "choices": [
      {
        "id": "A",
        "text": "Health > Attributes"
      },
      {
        "id": "B",
        "text": "Class Info > Attributes"
      },
      {
        "id": "C",
        "text": "Class Info > Basic Info x"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image142.png",
    "needsReview": false
  },
  {
    "id": "source-t1-026",
    "number": 26,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A ServiceNow Administrator needs to create multiple new classes in the CMDB but wants to follow ServiceNow's best practices for naming CMDB tables to prevent\ntechnical debt.\nWhich is the starting prefix for all custom CMDB tables?",
    "choices": [
      {
        "id": "A",
        "text": "ci_cmdb"
      },
      {
        "id": "B",
        "text": "cmdb_ci"
      },
      {
        "id": "C",
        "text": "u_cmdb_ci"
      },
      {
        "id": "D",
        "text": "u_ci_cmdb"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image41.png",
    "needsReview": false
  },
  {
    "id": "source-t1-027",
    "number": 27,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A Configuration Management team needs to prevent duplicate server records to avoid confusion among users. Server records are identified when they are processed via\nthe Identification and Reconciliation Engine (IRE) using the configured identification rules.\nWhere would these rules be configured?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Workspace"
      },
      {
        "id": "B",
        "text": "CMDB CI Class Manager"
      },
      {
        "id": "C",
        "text": "CMDB Health Dashboard k"
      },
      {
        "id": "D",
        "text": "CMDB Data Manager"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image99.png",
    "needsReview": false
  },
  {
    "id": "source-t1-028",
    "number": 28,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A CMDB Administrator notices that CIs do not have a support group.\nHow can the support group be automatically populated and maintained on the CI record?",
    "choices": [
      {
        "id": "A",
        "text": "Technology Management Service Offering (Technical Serdice Offering)"
      },
      {
        "id": "B",
        "text": "Technology Management Service (Technical Service)"
      },
      {
        "id": "C",
        "text": "CI Class Manager"
      },
      {
        "id": "D",
        "text": "Dynamic CI group"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image163.png",
    "needsReview": false
  },
  {
    "id": "source-t1-029",
    "number": 29,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "Using CI Class Manager, the Tomcat identification rule has the following criterion attributes configured:\n\u00abClass\n+ Install Directory\nWhich identifier entry configuration option must be checked to attempt a match using the Application identification rule if no match is found using the Tomcat\nidentification rule?",
    "choices": [
      {
        "id": "A",
        "text": "Allow fallback to parent's rules"
      },
      {
        "id": "B",
        "text": "Independent k"
      },
      {
        "id": "C",
        "text": "Applies to"
      },
      {
        "id": "D",
        "text": "Criterion attributes"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image62.png",
    "needsReview": false
  },
  {
    "id": "source-t1-030",
    "number": 30,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A CMDB Cli Class Owner has been asked to change the icon for the UNIX Server class.\nWhich CI Class Manager tab can the owner use to change the icon for the class?",
    "choices": [
      {
        "id": "A",
        "text": "CI List"
      },
      {
        "id": "B",
        "text": "Basic Info\n\n1"
      },
      {
        "id": "C",
        "text": "Attributes"
      },
      {
        "id": "D",
        "text": "Suggested Relationships"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image135.png",
    "needsReview": false
  },
  {
    "id": "source-t1-031",
    "number": 31,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A Configuration Manager is reviewing the life cycle of CIs to ensure data accuracy, consistency, and relevance. The manager reviews the legacy status values and their\nequivalent CSDM life cycle stage and life cycle stage status values.\nWhere are these reviewed?",
    "choices": [
      {
        "id": "A",
        "text": "Life cycle choice list"
      },
      {
        "id": "B",
        "text": "Life cycle mappings"
      },
      {
        "id": "C",
        "text": "Life cycle properties"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image88.png",
    "needsReview": false
  },
  {
    "id": "source-t1-032",
    "number": 32,
    "category": "CI Classes and Governance",
    "type": "multiple",
    "prompt": "An organization is updating the CMDB to include new asset types like loT devices. Relevant CI classes need to be added and outdated ones need to be removed from the\nPrincipal Class filter to ensure accurate display in ITSM processes.\nWhich roles are needed 10 add or remove classes? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "personalize_dictionary"
      },
      {
        "id": "B",
        "text": "sn_csdm_admin"
      },
      {
        "id": "C",
        "text": "sn_cmdb_admin"
      },
      {
        "id": "D",
        "text": "cmdb_query_builder"
      }
    ],
    "correctAnswers": [
      "A",
      "C"
    ],
    "explanation": "Source answer: A and C.",
    "image": "questions/image162.png",
    "needsReview": false
  },
  {
    "id": "source-t1-033",
    "number": 33,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "An IT group has a requirement to upgrade all the Windows servers. There is a Dynamic CI Group containing all the Windows servers.\nWhat happens to the Dynamic CI Group when it is referenced from the Configuration item field on a Change form?",
    "choices": [
      {
        "id": "A",
        "text": "It displays all related CIs in the Impacted Services related list."
      },
      {
        "id": "B",
        "text": "It calculates impact against the Dynamic CI Group."
      },
      {
        "id": "C",
        "text": "It displays all related CIs in the Affected CIs related list. A\nwees soon | \u00ae"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image160.png",
    "needsReview": false
  },
  {
    "id": "source-t1-034",
    "number": 34,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A CMDB Administrator is working in the CI Class Manager on the Basic Info tab.\nHow can the class be set as a Principal Class?",
    "choices": [
      {
        "id": "A",
        "text": "Check the Principal Class check box"
      },
      {
        "id": "B",
        "text": "Click the Principal Class Ul Action button"
      },
      {
        "id": "C",
        "text": "Select 'Yes' from the Principal Class choice list\n\u00e2\u20ac\"r\u00e2\u20ac\"\" rl"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image9.png",
    "needsReview": false
  },
  {
    "id": "source-t1-035",
    "number": 35,
    "category": "CI Classes and Governance",
    "type": "multiple",
    "prompt": "A global enterprise integrates data from multiple discovery sources such as ServiceNow Discovery, SCCM, AWS, and manual uploads to populate its CMDB. However,\neach discovery source categorizes the same CIs differdly, leading to duplicate records and inconsistencies across the system. As a result, the CMDB team is struggling\nwith data accuracy and standardization.\nWhat actions does the CMDB team take to resolve the issue? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Allow each discovery source to define its own CI class, even if it results in inconsistencies"
      },
      {
        "id": "B",
        "text": "Implement and use identification and reconciliation rules to avoid duplicates and standardize CI classification"
      },
      {
        "id": "C",
        "text": "Create a custom script to manually adjust incoming data before storing it in the CMDB"
      },
      {
        "id": "D",
        "text": "Use CI Class Manager to establish standardized CI classes and attributes across all discovery sources"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image159.png",
    "needsReview": false
  },
  {
    "id": "source-t1-036",
    "number": 36,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A CMDB CI Class Owner responsible for the Windows Servers needs to manage the Windows Server class.\nWhich CI Class Manager feature will help the CI Class Owner streamline this task?",
    "choices": [
      {
        "id": "A",
        "text": "Pinned Classes"
      },
      {
        "id": "B",
        "text": "CI Favorites"
      },
      {
        "id": "C",
        "text": "Search CI Classes [3"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image151.png",
    "needsReview": false
  },
  {
    "id": "source-t1-037",
    "number": 37,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "The Change Management team in an organization wants to implement a Change across multiple CIs at the same time.\nWhich field on the Change Request form needs to be populated with a dynamic CI group?",
    "choices": [
      {
        "id": "A",
        "text": "Configuration Item"
      },
      {
        "id": "B",
        "text": "Business Service"
      },
      {
        "id": "C",
        "text": "Service Offering"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image122.png",
    "needsReview": false
  },
  {
    "id": "source-t1-038",
    "number": 38,
    "category": "CI Classes and Governance",
    "type": "single",
    "prompt": "A CMDB Administrator needs to configure a new application identification rule that considers the potential for the same application installed more than once on the same\nserver,\nWhich is the best choice of a criterion attribute?",
    "choices": [
      {
        "id": "A",
        "text": "Version"
      },
      {
        "id": "B",
        "text": "Configuration File Name"
      },
      {
        "id": "C",
        "text": "Port"
      },
      {
        "id": "D",
        "text": "Configuration File Path\n\n3"
      },
      {
        "id": "E",
        "text": "Class"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image119.png",
    "needsReview": false
  },
  {
    "id": "source-t2-001",
    "number": 39,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "The CMDB Administrator has set-up two Dynamic Reconcilliation Rules within the ServiceNow Production Instance. The \"Server' class has a Dynamic Reconciliation Rule\nof largest value for the RAM field. The 'Windows Server' class has a Dynamic Reconciliation Rule of most reported for the RAM field.\nDiscovery Source i\n| ServiceNow | 4.09 |\nGiven the above data in the Multisource CMDB, which vplue would be added to the CMDB for RAM for a \"Server' CI?",
    "choices": [
      {
        "id": "A",
        "text": "4.0896 MB"
      },
      {
        "id": "B",
        "text": "8.192 MB"
      },
      {
        "id": "C",
        "text": "2.048 MB"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image96.png",
    "needsReview": false
  },
  {
    "id": "source-t2-002",
    "number": 40,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator needs to import external data into the CMDB. As the CMDB Administrator wants to reduce the risk for creating duplicates and to update\ninformation from unauthorized sources, it has to be ensured that the Identification and Reconciliation API will not be bypassed.\nWhat is the recommended method to import data into the CMDB utilizing the Identification and Reconciliation API?",
    "choices": [
      {
        "id": "A",
        "text": "IntegrationHub ETL"
      },
      {
        "id": "B",
        "text": "Table API (REST API or SOAP API)"
      },
      {
        "id": "C",
        "text": "Import Sets and Transform Maps"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image130.png",
    "needsReview": false
  },
  {
    "id": "source-t2-003",
    "number": 41,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A Configuration Manager has configured a multiple data sources which are all authorized to update the same class and the same set of class attributes in the CMDB.\nWhat can the Configuration Manager do to control which data source should be authoritative source of truth for a specific class of set of class attributes?",
    "choices": [
      {
        "id": "A",
        "text": "Assign a priority to each data source in the reconciliation rules"
      },
      {
        "id": "B",
        "text": "Manually run the data source updates in the correct order"
      },
      {
        "id": "C",
        "text": "Configure data refresh rules with a specific time period"
      },
      {
        "id": "D",
        "text": "Assign a run order to each data source in the identification rules"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image18.png",
    "needsReview": false
  },
  {
    "id": "source-t2-004",
    "number": 42,
    "category": "Data Ingestion and IRE",
    "type": "matching",
    "prompt": "Question #4 Topi\nWhich CMDB 360/Multisource CMDB the Dynamic Reconciliation Rules will also be enabled. Based on the request of the management, a CMDB Administrator has to set\nup multiple Dynamic Reconciliation Rules.\nWhich are available 'Dynamic Rule Types' within the 'Create Reconciliation Rule' wizard? (Choose two.)\n[3\n\nA. Last Updated\n\nB. Smallest Value\n\nC. Last Created",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image61.png",
    "needsReview": false
  },
  {
    "id": "source-t2-005",
    "number": 43,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "The following identification rule for a CI class has been defined:\nMordware Rule Criterion aoftributes Priority\nidentifier Entries Table\nSerial Number serial_number, 100\nserial_number_type\nHardwore senal_number 200\nHordwore nome 300\nR\nNetwork Adapter moc_oddress, nome 400\nTwo new CI records are imported into the hardware class of the CMDB:\nCI1: The name of this CI record matches the name of an existing CI record in the CMDB.\nCi2: The IP address of this CI record matches the IP address of an existing CI record in the CMDB.\nWhich is correct based on the identification rule and the imported CI records?",
    "choices": [
      {
        "id": "A",
        "text": "CIN will be inserted as new record and CI2 will be updated with matching record."
      },
      {
        "id": "B",
        "text": "CI1 will be updated with matching record and CI2 will be inserted as new record."
      },
      {
        "id": "C",
        "text": "CIN and CI2 both will be updated with matching records."
      },
      {
        "id": "D",
        "text": "CI1 and Ci2 both will be inserted as new records."
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image76.png",
    "needsReview": false
  },
  {
    "id": "source-t2-006",
    "number": 44,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A customer wants recently imported server records to be automatically reclassified into more specific CMDB classes after being discovered using ServiceNow Discovery.\nDuring the discovery process, if existing Server [cmdb_ci_server] records are reclassified into the Linux [emdb_ci_linux_server] and Windows Server [cmdb_ci_win_server]\nclasses, which reclassification operation occurred?\n[3",
    "choices": [
      {
        "id": "A",
        "text": "Class Upgrade"
      },
      {
        "id": "B",
        "text": "Class Downgrade"
      },
      {
        "id": "C",
        "text": "Class Switch"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image128.png",
    "needsReview": false
  },
  {
    "id": "source-t2-007",
    "number": 45,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A Platform Data Owner wants to improve data quality with a few reconciliation rules across the five discovery sources that are being used. The Data Owner knows the\nbest option is to include CMDB 360/Multisource CMDB to manage and monitor discovery sources, but the company currently does not have a license for ITOM Discovery\nthat is required for CMDB 360/Multisource CMDB.\nWhat can the Data Owner do in this case?",
    "choices": [
      {
        "id": "A",
        "text": "ITOM Discovery needs to be purchased to take advantage of the multisource IRE Rules."
      },
      {
        "id": "B",
        "text": "CMBD 360/Multisource is a platform product that can be used immediately."
      },
      {
        "id": "C",
        "text": "The IRE reconciliation rules can use discovery source regardless of CMDB 360 being enabled."
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image10.png",
    "needsReview": false
  },
  {
    "id": "source-t2-008",
    "number": 46,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "Which ServiceNow solution creates automatic relationships? k",
    "choices": [
      {
        "id": "A",
        "text": "IntegrationHub ETL"
      },
      {
        "id": "B",
        "text": "Discovery"
      },
      {
        "id": "C",
        "text": "Workflow Studio"
      },
      {
        "id": "D",
        "text": "Service Mapping"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image140.png",
    "needsReview": false
  },
  {
    "id": "source-t2-009",
    "number": 47,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "The Apache Wed Server Identification Rule is configured with the following Criterion attributes:\nClass-\nConfiguration file -\nVersion +\n= Mentifier Entry\nsys_class_ name config Mleversion\n\u00a5 dertiher | omdd od a0ache web server\n* Searchon table Apache Web Server v |\n* Criterion attributes | \u00a9)\nOass, Configuration fie, Version\nPriority 100]\nOptional condition | Add Filter Condition || Add \"OR\" Clause\n= choose held - v Oger - value R\n\nYesterday, an Apache Web Server CI was discovered as part of Service Mapping. Today, the application owner upgraded Apache to a different version and reran discovery\nof the service.\nWhat will happen in the CMDB?",
    "choices": [
      {
        "id": "A",
        "text": "The existing Apache Web Server Ci will be reconciled and its version will be updated."
      },
      {
        "id": "B",
        "text": "A duplication error will occur."
      },
      {
        "id": "C",
        "text": "The Apache Web Server CI will be reclassified as a Web Server Cl,"
      },
      {
        "id": "D",
        "text": "A new Apache Web Server CI is created"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image64.png",
    "needsReview": true
  },
  {
    "id": "source-t2-010",
    "number": 48,
    "category": "Data Ingestion and IRE",
    "type": "multiple",
    "prompt": "Configuration Management requires an accurate inventory of devices to be reflected in the CMDB.\nWhich are common use cases for using Agent Client Collector (ACC)? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Network devices in the DMZ"
      },
      {
        "id": "B",
        "text": "Devices that intermittently connect to the network"
      },
      {
        "id": "C",
        "text": "Servers in the data center"
      },
      {
        "id": "D",
        "text": "Devices in secure emironments"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image75.png",
    "needsReview": false
  },
  {
    "id": "source-t2-011",
    "number": 49,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "Z\nAn organization needs to maintain non-discoverable attributes, such as warranty expiration dates, for hardware CIs. These attributes are not updated by automated\ndiscovery 100ls.\nWhat method ensures these attributes are accurately maintained for all CIs?\n3",
    "choices": [
      {
        "id": "A",
        "text": "Create a new CI class specifically for non-discoverable attributes"
      },
      {
        "id": "B",
        "text": "Use the CMDB Reconciliation Engine to update the attributes"
      },
      {
        "id": "C",
        "text": "Use a scheduled data import to update the atnbutes from an external source"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image13.png",
    "needsReview": false
  },
  {
    "id": "source-t2-012",
    "number": 50,
    "category": "Data Ingestion and IRE",
    "type": "matching",
    "prompt": "DRAG DROP -\nServiceNow provides a suite of CMDB management tools designed to effectively ingest, manage, and maintain CIs and relationships\nDrag and drop the design architecture to #s management tool.\nSome options may not apply.\nOrganization-buit solution using transform | Answer Area\nmaps\nr\u00e2\u20ac\"\u00e2\u20ac\" FE Agent Client Collector\nAutomated agent-based solution running 3\npatterns\nAutomated agentiess solution running Import Sets\nAutomated agentiess solution running | J\n| patterns\nThird-party integrations from other rr\nvendors Service Graph Connector\nPre-built store integration solutions that\nrequire minimal customization | \\\nServiceNow Discovery",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Organization-built transform maps: Import Sets; agent-based patterns: Agent Client Collector; pre-built store integrations: Service Graph Connector; agentless patterns: ServiceNow Discovery.",
    "image": "questions/image58.png",
    "needsReview": false
  },
  {
    "id": "source-t2-013",
    "number": 51,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "When integrating data into the CMDB using import sets and transform maps, which type of script is added to ensure the data is processed through the IRE?",
    "choices": [
      {
        "id": "A",
        "text": "onBefore"
      },
      {
        "id": "B",
        "text": "onComplete"
      },
      {
        "id": "C",
        "text": "onStart"
      },
      {
        "id": "D",
        "text": "onAfter"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image63.png",
    "needsReview": false
  },
  {
    "id": "source-t2-014",
    "number": 52,
    "category": "Data Ingestion and IRE",
    "type": "multiple",
    "prompt": "The following Reconciliation Rules were configured for ServiceNow, Altiris, and SCCM:\nvote |\nServiceNow emdb ci win server\nWindows Server\ncemdb_ci_win_server\nWindows Server\nSCCM emdb ci win server\nWhich are true? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Data collected with a discovery source of SCCM can update any record in the Windows Server [cmdb_ci_win_server] table because it has the highest priority\nnumber"
      },
      {
        "id": "B",
        "text": "Data collected with a discovgey source of ServiceNow can insert new records into the Windows Server [cmdb_ci_win_server] table, but cannot update records\ncreated by Altiris of SCCM."
      },
      {
        "id": "C",
        "text": "Data collected with a discovery source of Altiris can update records inserted by SCCM into the Windows Server [cmdb_cl_win_server] table."
      },
      {
        "id": "D",
        "text": "Data collected with a discovery source of SCCM can be inserted as new recosds in the Windows Server [emdb_ci_win_server] table"
      }
    ],
    "correctAnswers": [
      "C",
      "D"
    ],
    "explanation": "Source answer: C and D.",
    "image": "questions/image103.png",
    "needsReview": false
  },
  {
    "id": "source-t2-015",
    "number": 53,
    "category": "Data Ingestion and IRE",
    "type": "matching",
    "prompt": "A CMDB Administrator has installed a Service Graph Connector and customized a script transform\nWhat will happen on subsequent upgrades if the default definition of the script transform is updated?\nAA skipped change is created and no change is made the script transform definition\nB. The Service Graph Connector upgrade refuses to start.\nk\nC. The upgrade stops and reports an error.",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image156.png",
    "needsReview": false
  },
  {
    "id": "source-t2-016",
    "number": 54,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A Windows server is reclassified from the Server table [cmdb_ci_server] to the Windows Server table [cmdd_ci_win_server] when processed through the Identification and\nReconciliation Engine (IRE).\nWhich process occurred?",
    "choices": [
      {
        "id": "A",
        "text": "Class Change"
      },
      {
        "id": "B",
        "text": "Class Switch"
      },
      {
        "id": "C",
        "text": "Class Downgrade"
      },
      {
        "id": "D",
        "text": "Class Upgrade"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image47.png",
    "needsReview": false
  },
  {
    "id": "source-t2-017",
    "number": 55,
    "category": "Data Ingestion and IRE",
    "type": "matching",
    "prompt": "DRAG DROP\nDrag and drop the product to its description.\nAnswer Area\n) Automatically identifies devices and applications in the network,\nAgent Client Collector (ACC) populating the CMDB with accurate and up-to-date information\nServiceNow Discovery Facilitates integration between ServiceNow and external\nsystems to import and synchronize data\nService Graph Connectors Complete topology of the services and shows how they\nare supported by underlying infrastructure and applications\nService Mapping ) ) ) ) ) )\nProvides real-time visibility into endpoint configurations,\npopulating the CMDB with accurate and up-to-date information\n=",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Automatically identifies devices and applications: ServiceNow Discovery; facilitates external-system imports: Service Graph Connectors; provides complete service topology: Service Mapping; provides endpoint configuration visibility: Agent Client Collector (ACC).",
    "image": "questions/image125.png",
    "needsReview": true
  },
  {
    "id": "source-t2-018",
    "number": 56,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "An organization utilizes multiple data sources 10 update its CMDB, each assigned a different priority level. A high-priority data source is scheduled to update server\nrecords weekly, However, due to an integration issue, the high-priority data source stops updating the records\nWhich configuration can be used to allow a lower-priceity data source 10 update records after a specified period of inactivity from the higher-priority source?",
    "choices": [
      {
        "id": "A",
        "text": "Data Refresh Rules"
      },
      {
        "id": "B",
        "text": "Reconciliation Rules"
      },
      {
        "id": "C",
        "text": "Health Inclusion Rules k"
      },
      {
        "id": "D",
        "text": "Identification Rules"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image4.png",
    "needsReview": false
  },
  {
    "id": "source-t2-019",
    "number": 57,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator has imported data into the ServiceNow CMDB from a third-party source using a Service Graph Connector. The Administrator wants to review\nspecific field to field mappings for the import.\nWhich feature will show that information?",
    "choices": [
      {
        "id": "A",
        "text": "Integration Hub |"
      },
      {
        "id": "B",
        "text": "IntegrationHub ETL"
      },
      {
        "id": "C",
        "text": "CMDB Integrations Dashboard"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image57.png",
    "needsReview": false
  },
  {
    "id": "source-t2-020",
    "number": 58,
    "category": "Data Ingestion and IRE",
    "type": "multiple",
    "prompt": "What are the characteristics or functions of ServiceNow IntegrationHub ETL? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Integrates third-party data into the CMDB or nto non-.CM DB tables"
      },
      {
        "id": "B",
        "text": "Uses the IRE to process and integrate data"
      },
      {
        "id": "C",
        "text": "Imports Microsoft SCCM/Intune data nto the CMDB"
      },
      {
        "id": "D",
        "text": "Performs discovery data collection and updates the CMDS"
      }
    ],
    "correctAnswers": [
      "A",
      "B"
    ],
    "explanation": "Source answer: A and B.",
    "image": "questions/image79.png",
    "needsReview": false
  },
  {
    "id": "source-t2-021",
    "number": 59,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator needs to ingest relevant data from Microsoft SCCM into the CMDB.\nWhich ingestion method brings the fastest time to value?",
    "choices": [
      {
        "id": "A",
        "text": "Import Sets"
      },
      {
        "id": "B",
        "text": "Service Graph Connectors"
      },
      {
        "id": "C",
        "text": "Agent Client Collector\n\n0. IntegrationHub ETL"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image38.png",
    "needsReview": false
  },
  {
    "id": "source-t2-022",
    "number": 60,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator changes the query for the SCCM Service Graph Connector.\nWhat is the impact of this change?",
    "choices": [
      {
        "id": "A",
        "text": "Any Scheduled Jobs for the SCCM Service Graph Connector will need 10 be configured."
      },
      {
        "id": "B",
        "text": "Arty updates for the SCCM Seqvice Graph Connector will be sipped during the upgrade"
      },
      {
        "id": "C",
        "text": "The Data Source for the SCCM Service Graph Connector will be marked as Inactive\nk"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image112.png",
    "needsReview": false
  },
  {
    "id": "source-t2-023",
    "number": 61,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator needs 10 prevent duplicate CI creation from import seis that load daa into the CMDB from vendor shipment files comaining CI information\nHow can the Administrator do this?",
    "choices": [
      {
        "id": "A",
        "text": "Set the coalesce on two mappings within the transform map"
      },
      {
        "id": "B",
        "text": "Create comparnson rules in the IRE"
      },
      {
        "id": "C",
        "text": "Set the system property 10 utilize the IRE within transform maps"
      },
      {
        "id": "D",
        "text": "Use the CMDBTransformUtil API in the transform script"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image69.png",
    "needsReview": false
  },
  {
    "id": "source-t2-024",
    "number": 62,
    "category": "Data Ingestion and IRE",
    "type": "multiple",
    "prompt": "A ServiceNow Administrator wants to implement Service Graph Connectors to provide integrations to many third-party solutions that the company wants integrated into\nthe CMDB.\nWhich categories of connectors are available to the Administrator? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "DevOps k"
      },
      {
        "id": "B",
        "text": "Cloud"
      },
      {
        "id": "C",
        "text": "Workflow Automation"
      },
      {
        "id": "D",
        "text": "Observability"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image6.png",
    "needsReview": false
  },
  {
    "id": "source-t2-025",
    "number": 63,
    "category": "Data Ingestion and IRE",
    "type": "matching",
    "prompt": "The Server [cmdb_ci_server] class uses a dynamic reconciliation rule of lowest value for the Disk Space (GB) field, while the Windows Server [cmdb_ci_win_server] class\nuses a dynamic reconciliation rule of most reported for the Disk Space (GB) field.\nGiven the following data sources that populate Windows Server data into the CMDB 360/Multisource CMDB:\nData Source Disk Space (GB\nServiceNow\nLANDesk so |\nWhich value would be added to the CMDB for the Disk Space (G8) field of a Windows Server [emdb_ci_win_server] record?\nA. 80\nB.75\nC.50",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image113.png",
    "needsReview": false
  },
  {
    "id": "source-t2-026",
    "number": 64,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A Configuration Manager needs to ingest third-party CIs into the CMDB.\nWhich method minimizes the risk of technical debt?",
    "choices": [
      {
        "id": "A",
        "text": "Vendor-provided integration"
      },
      {
        "id": "B",
        "text": "Table API"
      },
      {
        "id": "C",
        "text": "Service Graph Connector"
      },
      {
        "id": "D",
        "text": "Import Sets and Transform Maps"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image39.png",
    "needsReview": false
  },
  {
    "id": "source-t2-027",
    "number": 65,
    "category": "Data Ingestion and IRE",
    "type": "multiple",
    "prompt": "Which ServiceNow solutions automatically create relationships between CI Applications that are part of an Application Service? (Choose two.)\n\nA_ IntegrationHub ETL",
    "choices": [
      {
        "id": "B",
        "text": "Event Management"
      },
      {
        "id": "C",
        "text": "Discovery"
      },
      {
        "id": "D",
        "text": "Service Mapping"
      },
      {
        "id": "E",
        "text": "Data Manager"
      }
    ],
    "correctAnswers": [
      "C",
      "D"
    ],
    "explanation": "Source answer: C and D.",
    "image": "questions/image22.png",
    "needsReview": false
  },
  {
    "id": "source-t2-028",
    "number": 66,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator wants 10 leverage dynamic reconciliation rules.\nWhich feature must be enabled?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Data Manager"
      },
      {
        "id": "B",
        "text": "CMDB 350/Multisource CMDB"
      },
      {
        "id": "C",
        "text": "CMDB Workspace\n\n0. Reconciliation Rules x"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image89.png",
    "needsReview": false
  },
  {
    "id": "source-t2-029",
    "number": 67,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator needs the fastest time to value solution for effectively ingesting, managing, and maintaining CIs and relationships.\nWhich management tool will accomplish this to import Windows computer data from SCCM?",
    "choices": [
      {
        "id": "A",
        "text": "IntegrationHub ETL connection 10 SCCM using Robust Transform Engine (RTE)"
      },
      {
        "id": "B",
        "text": "Import set using JOBC data source connection to SCCM using transform maps"
      },
      {
        "id": "C",
        "text": "SCCM Service Graph Connector"
      },
      {
        "id": "D",
        "text": "SCCM Usage Metering Spoke"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image43.png",
    "needsReview": false
  },
  {
    "id": "source-t2-030",
    "number": 68,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Administrator has installed a Service Graph Connector (SGC), and then made customizations to the mappings.\nWhich is a consequence of this action?",
    "choices": [
      {
        "id": "A",
        "text": "Fields populated by a customization will have a special tag associated with them in the CMDB."
      },
      {
        "id": "B",
        "text": "The customization will prevent the SGC from executing without an approval record attached to the affected mapping record"
      },
      {
        "id": "C",
        "text": "The customized mappings are not supported by ServiceNow, and the customer is responsible for supporting their own customized SGC"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image164.png",
    "needsReview": false
  },
  {
    "id": "source-t2-031",
    "number": 69,
    "category": "Data Ingestion and IRE",
    "type": "single",
    "prompt": "A CMDB Data Owner has requested better insights on the different data sources that make up the CMDB data set. The Platform Owner knows that the new Service Graph\nConnector Central plugin is just what is needed.\nAfter installing the plugin, what workspace will have the new Service Graph Connector Central tab available?",
    "choices": [
      {
        "id": "A",
        "text": "Discovery Admin Workspace"
      },
      {
        "id": "B",
        "text": "CMDB Workspace"
      },
      {
        "id": "C",
        "text": "Service Graph Connector Workspace"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image77.png",
    "needsReview": false
  },
  {
    "id": "source-t3-001",
    "number": 70,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator would hike to minimize stale CIs in the CMDB.\nWhich CMDB Health Dashboard scorecard displays this information?",
    "choices": [
      {
        "id": "A",
        "text": "Correctness"
      },
      {
        "id": "B",
        "text": "Compliance"
      },
      {
        "id": "C",
        "text": "Completeness"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image146.png",
    "needsReview": false
  },
  {
    "id": "source-t3-002",
    "number": 71,
    "category": "CMDB Governance and Health",
    "type": "matching",
    "prompt": "DRAG DROP -\nDrag and drop the CMDB Health Dashboard metric to the description.\n| Audits Co oo | Answer Area\n' Use these to compare actual values with expected\n| Duplicate CIs | \u00e2\u20ac\" values\n[Orphan CIs oo ] | Use of these should be minimized\nRecommended fields | \u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\"\u00e2\u20ac\" )\nL | Certain attribute values are not set, or relationships are\n\\ J mis:\nRequired fields | x no\n[ | Preferable for them to be populated, as they could be\nStale CIs I useful in troubleshooting issues\n| Have not been updated and may be outdated\n| Detected during identification and reconciliation and\n| J have associated base system remediation tools",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Audits: Use these to compare actual values with expected values; Duplicate CIs: Use of these should be minimized; Required fields: Certain attribute values are not set, or relationships are missing; Recommended fields: Preferable for them to be populated, as they could be useful in troubleshooting issues; Stale CIs: Have not been updated and may be outdated; Orphan CIs: Detected during identification and reconciliation and have associated base system remediation tools.",
    "image": "questions/image80.png",
    "matchPairs": [
      {
        "id": "M1",
        "item": "Audits",
        "target": "Use these to compare actual values with expected values"
      },
      {
        "id": "M2",
        "item": "Duplicate CIs",
        "target": "Use of these should be minimized"
      },
      {
        "id": "M3",
        "item": "Required fields",
        "target": "Certain attribute values are not set, or relationships are missing"
      },
      {
        "id": "M4",
        "item": "Recommended fields",
        "target": "Preferable for them to be populated, as they could be useful in troubleshooting issues"
      },
      {
        "id": "M5",
        "item": "Stale CIs",
        "target": "Have not been updated and may be outdated"
      },
      {
        "id": "M6",
        "item": "Orphan CIs",
        "target": "Detected during identification and reconciliation and have associated base system remediation tools"
      }
    ],
    "needsReview": true
  },
  {
    "id": "source-t3-003",
    "number": 72,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator is asked to clean up the CMDB duplicates.\nWhat is the preferred way to manage this task?",
    "choices": [
      {
        "id": "A",
        "text": "My Tasks in the Application Navigator"
      },
      {
        "id": "B",
        "text": "The de-duplication task module"
      },
      {
        "id": "C",
        "text": "The de-duplication dashboard on the CMDB workspace"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image127.png",
    "needsReview": true
  },
  {
    "id": "source-t3-004",
    "number": 73,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator identifies duplicate CIs. One was created by a manual import, and the other one was created by automated discovery. The discovered CI has the\nlatest IP address, while the manually imported CI has an accurate relationship to a critical business application,\nHow does the Administrator use the Duplicate CI Remediator to resolve this issue?",
    "choices": [
      {
        "id": "A",
        "text": "Retain the manually imported Cl, and delete the discovered Cl"
      },
      {
        "id": "B",
        "text": "Merge the two CIs automatically, retaining all attributes from the discovered Cl"
      },
      {
        "id": "C",
        "text": "Retain the discovered Ci, but merge the relationship from the manually imported Cl"
      },
      {
        "id": "D",
        "text": "Retain the discovered Ci, and delete the manually imported Cl"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image53.png",
    "needsReview": false
  },
  {
    "id": "source-t3-005",
    "number": 74,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator wants to remove all Linux Servers in the organization that have not been updated in six months.\nWhich recommended action does the Administrator take in Data Manager?",
    "choices": [
      {
        "id": "A",
        "text": "Create a business rule"
      },
      {
        "id": "B",
        "text": "Create an archive policy"
      },
      {
        "id": "C",
        "text": "Create a scheduled job"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image83.png",
    "needsReview": false
  },
  {
    "id": "source-t3-006",
    "number": 75,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "The CMDB Administrator group aims to display meaningful results on the CMDB Health Dashboard Compliance Scorecard for server records that are not on the latest\npatch.\nWhat must be configured to achieve this goal?",
    "choices": [
      {
        "id": "A",
        "text": "Certification Policies, Data Filters, Scheduled Jobs"
      },
      {
        "id": "B",
        "text": "Stale, Orphan, Duplicate"
      },
      {
        "id": "C",
        "text": "Certification Filter, Certification Template, Audit"
      },
      {
        "id": "D",
        "text": "Technical Service Offerings, Dynamic CI Groups, CMDB Groups"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image132.png",
    "needsReview": false
  },
  {
    "id": "source-t3-007",
    "number": 76,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator has been tasked with gathering information for a presentation to leadership. The Administrator needs to provide Duplicate Cl, Orphan CI, and Stale\nCi metrics.\nWhich scorecard provides this information on the CMDB Health Dashboard?",
    "choices": [
      {
        "id": "A",
        "text": "Completeness"
      },
      {
        "id": "B",
        "text": "Compliance"
      },
      {
        "id": "C",
        "text": "Correctness"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image87.png",
    "needsReview": false
  },
  {
    "id": "source-t3-008",
    "number": 77,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "What is the difference between Data Certification and Attestation policies when managing a Ci?",
    "choices": [
      {
        "id": "A",
        "text": "Attestation requires correcting specific attributes of a Ci, while Data Cerufication tracks acknowledgement the CI still exists."
      },
      {
        "id": "B",
        "text": "Attestation can be scheduled, while Data Certification cannot be scheduled."
      },
      {
        "id": "C",
        "text": "Attestation tracks acknowledgement the Ci still exists, while Data Certification requires validating specific attributes of a Cl."
      },
      {
        "id": "D",
        "text": "Attestation can be assigned 10 a Group or an individual, while Data Certification can only be assigned to an individual"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image131.png",
    "needsReview": false
  },
  {
    "id": "source-t3-009",
    "number": 78,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator is reviewing the health of the CMDB and notices a large percentage of the Hardware CIs are missing serial numb&s. The Administrator is\nconcerned this may cause duplicate CIs and would like to resolve the issue in a timely manner.\nWhat structured guidelines provided by ServiceNow are available to troubleshoot and resolve the issue?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Health Dashboards Playbooks"
      },
      {
        "id": "B",
        "text": "CSDM Now Create Playbooks"
      },
      {
        "id": "C",
        "text": "CSDB Data Foundations Dashboard Playbooks"
      },
      {
        "id": "D",
        "text": "CSDM Data Foundations Dashboard Playbooks"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C (source note says CMDB, not CSDB).",
    "image": "questions/image171.png",
    "needsReview": false
  },
  {
    "id": "source-t3-010",
    "number": 79,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "Configuration Management needs to ensure data quality for all CIs in the CMDB.\nWhat areas of data quality for CIs are in the CMDB Health Dashboard? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Missing CIs"
      },
      {
        "id": "B",
        "text": "State CIs"
      },
      {
        "id": "C",
        "text": "Duplicate CIs"
      },
      {
        "id": "D",
        "text": "Downgraded CIs"
      },
      {
        "id": "E",
        "text": "Upgraded CIs\n=x\n\n|"
      }
    ],
    "correctAnswers": [
      "B",
      "C"
    ],
    "explanation": "Source answer: B and C.",
    "image": "questions/image167.png",
    "needsReview": false
  },
  {
    "id": "source-t3-011",
    "number": 80,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Configuration Manager is reviewing the metrics on the CMDB Health Dashboard's Correctness Scorecard for the Server class which consists of a total of 60,000\nservers in the CMDB.\nFor the Duplicate metric, it shows Healthy CIs/Evaluated as $9,000/60,000.\nFor the Orphan metric, it shows Healthy CIs/Evaluated as 45,000/50,000.\nWhich configuration explains the difference in the scope of Server CIs (60,000 vs.50,000) evaluated between the two metrics?",
    "choices": [
      {
        "id": "A",
        "text": "The Duplicate metric has a CMDB Group configured for the Server class"
      },
      {
        "id": "B",
        "text": "The Duplicate metric has a Health Inclusion rule configured for the Server class."
      },
      {
        "id": "C",
        "text": "The Orphan metric has a Health Inclusion rule configured for the Server class.\n\n0. The Orphan metric has a CMDB Group configured for the Server class\n\nI"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image155.png",
    "needsReview": false
  },
  {
    "id": "source-t3-012",
    "number": 81,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "CMDB class owners are receiving tasks under the 'My Work' tab in the CMDB Workspace.\nWhich CMDB management tool is generating these tasks?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Data Manager"
      },
      {
        "id": "B",
        "text": "De-duplication templates"
      },
      {
        "id": "C",
        "text": "CMDB Health Dashboard"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image81.png",
    "needsReview": false
  },
  {
    "id": "source-t3-013",
    "number": 82,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "What ensures data volume in the CMDB manageable?",
    "choices": [
      {
        "id": "A",
        "text": "Scheduled Jobs"
      },
      {
        "id": "B",
        "text": "Archive Policies"
      },
      {
        "id": "C",
        "text": "Business Rules"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image153.png",
    "needsReview": false
  },
  {
    "id": "source-t3-014",
    "number": 83,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Manager wants to improve data quality using the CMDB Health Dashboard,\nWhat needs to happen to generate CMDB health scores?",
    "choices": [
      {
        "id": "A",
        "text": "Nothing, CMDB health scores are calculated by default"
      },
      {
        "id": "B",
        "text": "The plugin, CMDB health calculation, needs to be installed"
      },
      {
        "id": "C",
        "text": "The scheduled jobs for the CMDB Health Dashboard must be activated"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image90.png",
    "needsReview": false
  },
  {
    "id": "source-t3-015",
    "number": 84,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "The CMDB Configuration Manager is using the CI Class Manager to manage the group ownership of Ci classes and needs to leverage the ownership value specified in the\nCt Class Manager.\nWhen configuring 2 CMDB Data Manager policy, which group reference field should be set?",
    "choices": [
      {
        "id": "A",
        "text": "Change Group"
      },
      {
        "id": "B",
        "text": "Approval Group"
      },
      {
        "id": "C",
        "text": "Managed By Group"
      },
      {
        "id": "D",
        "text": "Support Group"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image71.png",
    "needsReview": false
  },
  {
    "id": "source-t3-016",
    "number": 85,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "The CMDB Ceafiguration Management team wants to manage de-duplication tasks generated from data ingested into the CMDB via the Identification and Reconciliation\nengine (IRE).\nin which area of the CMDB Workspace can they locate these de-duplication tasks?",
    "choices": [
      {
        "id": "A",
        "text": "Important actions tile under the Home tab"
      },
      {
        "id": "B",
        "text": "CMDB feature adoption tile under the insight tab"
      },
      {
        "id": "C",
        "text": "Total status tile under the My Work tab"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image170.png",
    "needsReview": false
  },
  {
    "id": "source-t3-017",
    "number": 86,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "Which type of CMDB Data Manager policy creates tasks that allow the assigned indridual to update fields on the CI record?",
    "choices": [
      {
        "id": "A",
        "text": "Complignce"
      },
      {
        "id": "B",
        "text": "Certification"
      },
      {
        "id": "C",
        "text": "Attestation"
      },
      {
        "id": "D",
        "text": "Audit"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image8.png",
    "needsReview": false
  },
  {
    "id": "source-t3-018",
    "number": 87,
    "category": "CMDB Governance and Health",
    "type": "matching",
    "prompt": "DRAG DROP -\nA new ServiceNow customer is assembling a Configuration Management team to support their CMDB.\nDrag each role 10 its corresponding job description.\n| CI Analyst | Answer Area\nBh Has read-only access to CMDB data and to basic user\n|cvo8 Process Owner interface such as CMDB reports and dashboards\n| Configuration Manager/CMOB Admin | | Accountable for managing all elements that make up a\n| | portfolio throughout their entire ifecycie\nService or Product Owner\n' : | Manages assigned CI tables and keeps records\nupdated and resolves tasks related to CMDB records\nObtains highest level role for CMDB privileges",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: CI Analyst: read-only CMDB access; Service or Product Owner: accountable for portfolio lifecycle; CMDB Process Owner: manages assigned CI tables and tasks; Configuration Manager/CMDB Admin: highest CMDB privileges.",
    "image": "questions/image48.png",
    "needsReview": false
  },
  {
    "id": "source-t3-019",
    "number": 88,
    "category": "CMDB Governance and Health",
    "type": "matching",
    "prompt": "DRAG DROP -\nA CMDB Administrator seeks to understand the avaiidie tools for preventing, addressing, and remediating duplicate CIs.\nDrag and drop each feature with the corresponding outcome\nSome options may not apply.\nCertification Tosks Answer Area\nEE \u00e2\u20ac\" Can bo assigned to groups for resolving duplicate CIs\nCMDB Heath Dashboard Correctness Scorecard\n. Offers insight into duplicate CIs within the CMDB\nDe-Duplication Tasks\nDe-Duplication Templates | Offers a solution 10 resolve de-duplication tasks in bulk\nDuplicate CI Remediator [ 1 Provides a wizard 10 resolve de-duphication tasks ndnidus\n0 YE",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: De-Duplication Tasks: assigned to groups; CMDB Health Dashboard Correctness Scorecard: duplicate insights; De-Duplication Templates: bulk resolution; Duplicate CI Remediator: individual wizard.",
    "image": "questions/image136.png",
    "needsReview": true
  },
  {
    "id": "source-t3-020",
    "number": 89,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A Configuration Manager needs to leverage a policy type to automate the creation and assignment of tasks to validate the existence of CIs.\nWhich policy type should be used to accomplish this goal?",
    "choices": [
      {
        "id": "A",
        "text": "Retire k"
      },
      {
        "id": "B",
        "text": "Certification"
      },
      {
        "id": "C",
        "text": "Delete"
      },
      {
        "id": "D",
        "text": "Attestation"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image161.png",
    "needsReview": false
  },
  {
    "id": "source-t3-021",
    "number": 90,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "Which is a purpose or requirement of CMDB Data Manager in ServiceNow?",
    "choices": [
      {
        "id": "A",
        "text": "Encrypts archived records for enhanced security"
      },
      {
        "id": "B",
        "text": "Automates the enforcement of relationship rules between CIs in the CMDB"
      },
      {
        "id": "C",
        "text": "Automates the archival and deletion of records based on retention policies\n="
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image20.png",
    "needsReview": false
  },
  {
    "id": "source-t3-022",
    "number": 91,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Data Manager needs to access the ServiceNow platform to create, publish, and manage policies that automate and govern Ci lifecycle operations, ensuring the\nCMDB remains healthy and efficient\nWhese can the Data Manager do this?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Workspace Management 1ab"
      },
      {
        "id": "B",
        "text": "Service Operations Workspace"
      },
      {
        "id": "C",
        "text": "CMDB Workspace CMDB 360 tab\n\n0. Ci Class Manager"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image21.png",
    "needsReview": false
  },
  {
    "id": "source-t3-023",
    "number": 92,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator wants to ensure all short-lived CIs that have not been discovered in the past week are removed.\nAfter retiring the Ci records, which recommended action does the CMDB Administrator take?",
    "choices": [
      {
        "id": "A",
        "text": "Create a delete police"
      },
      {
        "id": "B",
        "text": "Create a business rule"
      },
      {
        "id": "C",
        "text": "Create 8 scheduled job"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image68.png",
    "needsReview": false
  },
  {
    "id": "source-t3-024",
    "number": 93,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator has taken over management of a ServiceNow instance and has determined there are multiple deficiencies in the CMDB. During review of the CMDB\nData Foundations Dashboard, the Administrator sees that ServiceNow offers Remediation Playbooks.\nHow can Playbooks assist the Administrator in resolving these issues?",
    "choices": [
      {
        "id": "A",
        "text": "Piaydooks can be installed in the instance to automatically fix issues"
      },
      {
        "id": "B",
        "text": "Playbooks can help analyze and fix issues."
      },
      {
        "id": "C",
        "text": "Playbooks can automatically track common CMDB issues and output metrics. [Y"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image45.png",
    "needsReview": false
  },
  {
    "id": "source-t3-025",
    "number": 94,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "A CMDB Administrator utilizing the CMDB Data Foundations Dashboard sees an issue and wants to run a playbook.\nWhich types of documentation can they expect to be provided in a playbook? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Root Cause"
      },
      {
        "id": "B",
        "text": "Automated Remediations"
      },
      {
        "id": "C",
        "text": "Prodlem Analysis"
      },
      {
        "id": "D",
        "text": "Problem Overview"
      }
    ],
    "correctAnswers": [
      "C",
      "D"
    ],
    "explanation": "Source answer: C and D.",
    "image": "questions/image19.png",
    "needsReview": false
  },
  {
    "id": "source-t3-026",
    "number": 95,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "A CMDB Administrator is considering whether to start using the playbooks provided on the CMDB Data Foundation Dashboard.\nWhat ace the benefits to support the decision to leverage this feature? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Offers automated scripts to resolve poorly performing metrics"
      },
      {
        "id": "B",
        "text": "Offers insight into the downstream impacts of poorly performing metrics"
      },
      {
        "id": "C",
        "text": "Offers remediation options to address and improve pootly performng metrics"
      },
      {
        "id": "D",
        "text": "Offers remediation templates to impeove poorly performing metrics"
      }
    ],
    "correctAnswers": [
      "B",
      "C"
    ],
    "explanation": "Source answer: B and C.",
    "image": "questions/image169.png",
    "needsReview": false
  },
  {
    "id": "source-t3-027",
    "number": 96,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator is beginning the journey of populating the CMDB and needs to verify that any data which is no longer useful/applicable is removed.\nWhich governance management tool will accomplish this?",
    "choices": [
      {
        "id": "A",
        "text": "Ci Class Manager"
      },
      {
        "id": "B",
        "text": "CMDB and CSDM Data Foundations Dashboard"
      },
      {
        "id": "C",
        "text": "CMDB Data Manager\n\n0. De duplication Templates"
      },
      {
        "id": "E",
        "text": "CMDB Health Dashboard\n(A +"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image108.png",
    "needsReview": false
  },
  {
    "id": "source-t3-028",
    "number": 97,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "The CMDB Administrator wants to leverage the Staleness metric from the CMDB Health Dashboard - Correctness Scorecard.\nWhich field is used to calculate the duration of this metric?",
    "choices": [
      {
        "id": "A",
        "text": "Updated (sys. updated on)"
      },
      {
        "id": "B",
        "text": "Created (sys. created _on)"
      },
      {
        "id": "C",
        "text": "Last modifeed on (last_modified)"
      },
      {
        "id": "D",
        "text": "Most recent discovery (last discovery)"
      },
      {
        "id": "E",
        "text": "First discovered (first_discovered)\n\n[NY"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image55.png",
    "needsReview": true
  },
  {
    "id": "source-t3-029",
    "number": 98,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A data center has many servers. The CMDB Administrator wants 1o confirm that all servers exist\nWhich Data Manager policy type does the Administrator implement?",
    "choices": [
      {
        "id": "A",
        "text": "Attestation"
      },
      {
        "id": "B",
        "text": "Certification"
      },
      {
        "id": "C",
        "text": "Promotion"
      },
      {
        "id": "D",
        "text": "Verification"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image16.png",
    "needsReview": false
  },
  {
    "id": "source-t3-030",
    "number": 99,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "Using existing baseline Data Manager policies, what condition must a CI meet before it can be archived or deleted?",
    "choices": [
      {
        "id": "A",
        "text": "Be fully operational and in use"
      },
      {
        "id": "B",
        "text": "Be marked as critical\nk"
      },
      {
        "id": "C",
        "text": "Be retired and in end of life"
      },
      {
        "id": "D",
        "text": "Be marked as inactive"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image65.png",
    "needsReview": false
  },
  {
    "id": "source-t3-031",
    "number": 100,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "The Configuration Management team wants to confirm that all servers in the CMDB actually exist in the data center.\nWhich CMDB Data Manager policy type would the team create?",
    "choices": [
      {
        "id": "A",
        "text": "Attestation"
      },
      {
        "id": "B",
        "text": "Retire"
      },
      {
        "id": "C",
        "text": "Delete"
      },
      {
        "id": "D",
        "text": "Archive"
      },
      {
        "id": "E",
        "text": "Certification"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image42.png",
    "needsReview": false
  },
  {
    "id": "source-t3-032",
    "number": 101,
    "category": "CMDB Governance and Health",
    "type": "matching",
    "prompt": "DRAG DROP\nDrag and drop the CMDB Health Dashboard metric to the description.\nAnswer Area\nAudit | CMDB records that represent the same physical or\n: \"logical asset multiple times\nDuplicate \u00e2\u20ac\" .\nFields necessary to create or update a CI record in the\nOrphan ' CMDB\nRecommended | CMDB records that no longer maintain their logical or\nphysical relationships with other CIs\nRequired\n: CMDB records that are no longer actively updated, but N\nStale remain stored in the database\nFields that support the accuracy, completeness, and\n: \"usability of CI records in the CMDB\n1 Actual values of specified fields are compared to the\nexpected values defined in a template",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Duplicate: same asset represented multiple times; Required: necessary to create or update a CI; Orphan: missing logical or physical relationships; Stale: no longer updated; Recommended: supports accuracy and usability; Audit: compares actual values with template expectations.",
    "image": "questions/image24.png",
    "needsReview": false
  },
  {
    "id": "source-t3-033",
    "number": 102,
    "category": "CMDB Governance and Health",
    "type": "matching",
    "prompt": "DRAG DROP\nThe CMDB Health Dashboard is based on theee Key Performance Indicators (KPIs). Correctness, Compliance, and Completeness. Each KPI includes several sub-metrics\nDrag the submetrics to the KPI.\nSome options may not apply.\nAnswer Area\n\nAudit Completeness\n\nStability Compliance\n\nRequired Correctness\n\nCertify\n\nSuggested N\n\nOrphan",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Completeness: Required; Compliance: Audit; Correctness: Orphan.",
    "image": "questions/image107.png",
    "needsReview": false
  },
  {
    "id": "source-t3-034",
    "number": 103,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "How do CMDB management tools and features within the CMDB governance pillar help organizations manage CIs and improve service delivery? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Reduced hardware costs"
      },
      {
        "id": "B",
        "text": "Gain visibdty and control"
      },
      {
        "id": "C",
        "text": "Assist integration choices"
      },
      {
        "id": "D",
        "text": "Enhanced Service Management operations N"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image145.png",
    "needsReview": false
  },
  {
    "id": "source-t3-035",
    "number": 104,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "What types of policies can be created within CMDB Dats Manager? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Retire"
      },
      {
        "id": "B",
        "text": "Reconciliation"
      },
      {
        "id": "C",
        "text": "De-duplication"
      },
      {
        "id": "D",
        "text": "Archive"
      }
    ],
    "correctAnswers": [
      "A",
      "D"
    ],
    "explanation": "Source answer: A and D.",
    "image": "questions/image2.png",
    "needsReview": false
  },
  {
    "id": "source-t3-036",
    "number": 105,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "Which default user groups are available when setting up a CMDB Data Manager polscy and specifying the task assignment with the Assignment type set to 'User Group\nField'? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Owned by Group"
      },
      {
        "id": "B",
        "text": "Assignment Group"
      },
      {
        "id": "C",
        "text": "Managed By Group"
      },
      {
        "id": "D",
        "text": "Support Group"
      }
    ],
    "correctAnswers": [
      "C",
      "D"
    ],
    "explanation": "Source answer: C and D.",
    "image": "questions/image70.png",
    "needsReview": false
  },
  {
    "id": "source-t3-037",
    "number": 106,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "During a CMDB implementation, a team member is tasked with ensuring the accuracy and completeness of CI data. This person is also responsible for maintaining data\nquality and resolving discrepancies.\nWhich role is responsible for these tasks?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Architect"
      },
      {
        "id": "B",
        "text": "IT Asset Manager"
      },
      {
        "id": "C",
        "text": "Configuration Manager\n\n0. Service Owner"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image23.png",
    "needsReview": false
  },
  {
    "id": "source-t3-038",
    "number": 107,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "A CMDB Configuration Manager sets up the following data filter for a certification policy using CMDB Data Manager.\n\u00ab Table: Server [emdb_ci_server]\n\u00ab Filter: Operating System | contains | Server OR Operating System | contains | Linux\nWhich operating Systems are affected by this policy? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Linux CentOS"
      },
      {
        "id": "B",
        "text": "AIX"
      },
      {
        "id": "C",
        "text": "Windows Server 2022 Datacenter"
      },
      {
        "id": "D",
        "text": "Windows 2019 Datacenter"
      }
    ],
    "correctAnswers": [
      "A",
      "C"
    ],
    "explanation": "Source answer: A and C.",
    "image": "questions/image59.png",
    "needsReview": false
  },
  {
    "id": "source-t3-039",
    "number": 108,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator needs to track which CIs and CI classes are missing key data.\nWhich CMDB Health Dashboard scorecard supports tracking this requirement?",
    "choices": [
      {
        "id": "A",
        "text": "Correciness k"
      },
      {
        "id": "B",
        "text": "Completeness"
      },
      {
        "id": "C",
        "text": "Compliance"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image66.png",
    "needsReview": false
  },
  {
    "id": "source-t3-040",
    "number": 109,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator has 2 number of similar de-duplication tasks that need to be remediated in bulk\nx\n\nHow does the Administrator achieve this?",
    "choices": [
      {
        "id": "A",
        "text": "Utilize the Duplicate Ci Remediator Wizard"
      },
      {
        "id": "B",
        "text": "Configure and run a custom de-duplication background script"
      },
      {
        "id": "C",
        "text": "Create de-duplication tasks manually and remediate each"
      },
      {
        "id": "D",
        "text": "Create and run a de-duplication template"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image123.png",
    "needsReview": false
  },
  {
    "id": "source-t3-041",
    "number": 110,
    "category": "CMDB Governance and Health",
    "type": "matching",
    "prompt": "A CMDB Administrator group aims to establish a process for recering task notifications when the Support Group or Managed By Group fields are not populated for\noperational Linux servers stored in the CMDB.\nWhich ServiceNow modules can be leveraged to configure recommended fields and generate task records in cases where these fields are missing for Linux servers in the\nCMDB?\n\nA. CMDB Workspace and Scheduled Jobs\n\nB. Technical Service Offerings and mame Ci groups\n\nC. Dynamic CI groups and CMDB groups\n\n0. Ci Class Manager and Health Preferences",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image7.png",
    "needsReview": false
  },
  {
    "id": "source-t3-042",
    "number": 111,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator has a report in ServiceNow that lists all CMDB Sefvices that do not have an owner and wants 10 use a ServiceNow Playbook.\nWhat Governance process play can prevent this from recurring?",
    "choices": [
      {
        "id": "A",
        "text": "Set a default value on the Service Owner field so that is never empty"
      },
      {
        "id": "B",
        "text": "Make the field Owned by mandatory"
      },
      {
        "id": "C",
        "text": "Make the field Managed by mandatory on all CIs"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image11.png",
    "needsReview": false
  },
  {
    "id": "source-t3-043",
    "number": 112,
    "category": "CMDB Governance and Health",
    "type": "matching",
    "prompt": "A CMDB Administrator wants 10 leverage the Staleness metric from the CMDB Health Dashboard - Correctness Scorecard.\nWhat is the default duration of this metric?\n\nA. 30 days\n\nB. 24 hours\n\nC.7 days\n\n0. 60 days",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image94.png",
    "needsReview": false
  },
  {
    "id": "source-t3-044",
    "number": 113,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A Configuration Manager responsible for a specific region wants to use the CMDB Health Dashboard to improve the data quality of the CMDB for that region. The\nConfiguration Manager only sees the overall score and grouped by CI Class.\nHow can the Configuration Manager get a score for regionally relevant CIs?",
    "choices": [
      {
        "id": "A",
        "text": "On the CMDB health settings, activate the option, Group scores by region"
      },
      {
        "id": "B",
        "text": "Customize the CMDB Health Dashboard scheduled jobs to group the results by region"
      },
      {
        "id": "C",
        "text": "Create CMDB groups with type, health, by region\n\n[Y"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image14.png",
    "needsReview": false
  },
  {
    "id": "source-t3-045",
    "number": 114,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "How does 8 CMDB Administrator use the ServiceNow Platform to ensure the data quality associated with CIs in the CMDB?",
    "choices": [
      {
        "id": "A",
        "text": "Data Quality Scheduled Job"
      },
      {
        "id": "B",
        "text": "CMDB Audit Business Rule"
      },
      {
        "id": "C",
        "text": "CMDB Workspace"
      },
      {
        "id": "D",
        "text": "Data Quality Business Rule"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image98.png",
    "needsReview": false
  },
  {
    "id": "source-t3-046",
    "number": 115,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Configuration Manager is reviewing the metrics on the CMDB Health Dashboard's Correctness Scorecard. For the Duplicate metric in the Server class, it shows\nHealthy CIs/Evaluated as 59,000/60,000\nWhat does this indicate about the scope of server records calculated under this metric?",
    "choices": [
      {
        "id": "A",
        "text": "1,000 server cecords are in scope for this metic"
      },
      {
        "id": "B",
        "text": "60,000 server records are in scope for this metric"
      },
      {
        "id": "C",
        "text": "59,000 Linux and 60,000 Windows servers records are in Lope for this metric"
      },
      {
        "id": "D",
        "text": "59,000 server records are in scope for this metric\n="
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image138.png",
    "needsReview": false
  },
  {
    "id": "source-t3-047",
    "number": 116,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Administrator wants 10 start utilizing the CMDB Health Dashboard and its Key Performance Indicators.\nWhat does the Administrator do to start using the dashboard?",
    "choices": [
      {
        "id": "A",
        "text": "Download the dashboard from the ServiceNow store"
      },
      {
        "id": "B",
        "text": "Nothing, the dashboard is activated by default x"
      },
      {
        "id": "C",
        "text": "Activate the dashboard scheduled jobs"
      },
      {
        "id": "D",
        "text": "Activate the dashboard system property"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image29.png",
    "needsReview": false
  },
  {
    "id": "source-t3-048",
    "number": 117,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "Which are CMDB Data Manager end of life policy types? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Archive"
      },
      {
        "id": "B",
        "text": "Retire"
      },
      {
        "id": "C",
        "text": "Lost\n\n0. Decommission"
      },
      {
        "id": "E",
        "text": "Disposed\n\n[3"
      }
    ],
    "correctAnswers": [
      "A",
      "B"
    ],
    "explanation": "Source answer: A and B.",
    "image": "questions/image25.png",
    "needsReview": false
  },
  {
    "id": "source-t3-049",
    "number": 118,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB team has noticed that some hardware CIs are missing the serial number information, making it difficult to maintain data accuracy. The team needs a structured\napproach to identify and address these gaps.\nWhich accomplishes this task?",
    "choices": [
      {
        "id": "A",
        "text": "Ci Class Manager"
      },
      {
        "id": "B",
        "text": "Service Graph Connectors"
      },
      {
        "id": "C",
        "text": "CMDB Data Foundation Playbook x"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image95.png",
    "needsReview": false
  },
  {
    "id": "source-t3-050",
    "number": 119,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A CMDB Configuration Manager intends to implement CMDB Data Manager delete and archive policies for all server records in the New York datacenter.\nIn which lifecycle state would servers be affected by these new policies?",
    "choices": [
      {
        "id": "A",
        "text": "Missing - Stolen\n\nx"
      },
      {
        "id": "B",
        "text": "Inventory - Available"
      },
      {
        "id": "C",
        "text": "End of Life - Retired"
      },
      {
        "id": "D",
        "text": "In any lifecycle stale"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image168.png",
    "needsReview": false
  },
  {
    "id": "source-t3-051",
    "number": 120,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "The CMDB Administrator has been asked to establish Configuration Management with a functional CMDB.\nWhich factor is most critical for successfully operationalizing the CMDB in ServiceNow?",
    "choices": [
      {
        "id": "A",
        "text": "Populating the CMDB with as much data as possible 10 ensure a comprehensive inventory of CIs"
      },
      {
        "id": "B",
        "text": "Establishing clear governance and continwously monitoring CMDB health"
      },
      {
        "id": "C",
        "text": "Allowing IT teams to modify CMDB records as needed to promote flexibility in data management"
      },
      {
        "id": "D",
        "text": "Relying on automated discovery tools 1o maintain abd update CMDB records\n="
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image54.png",
    "needsReview": false
  },
  {
    "id": "source-t3-052",
    "number": 121,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "Where does a user with the appropriate role(s) review and manage the generated tasks after configuring CMDB Data Manager policies?\nk",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Health Dashboard > Duplicate CIs tab"
      },
      {
        "id": "B",
        "text": "CMDB Workspace > My Work tab"
      },
      {
        "id": "C",
        "text": "CMDB Health Dashboard > Audit tab"
      },
      {
        "id": "D",
        "text": "CMDB Workspace > Management tab"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image1.png",
    "needsReview": false
  },
  {
    "id": "source-t3-053",
    "number": 122,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A Configuration Management Process Owner needs to configure Data Manager for policy tasks to be correctly assigned and aligned with the group attribute assigned to a\nclass in CI Class Manager.\nWhich is the recommended field to be used for a policy task assignment?",
    "choices": [
      {
        "id": "A",
        "text": "Managed by group"
      },
      {
        "id": "B",
        "text": "Change group y"
      },
      {
        "id": "C",
        "text": "Approval group"
      },
      {
        "id": "D",
        "text": "Support group"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image120.png",
    "needsReview": false
  },
  {
    "id": "source-t3-054",
    "number": 123,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "A CMDB Administrator uses the CMDB Data Foundations Dashboard to gain insights into the CMDB. The results display low scores for several metrics.\nWhich actions can the CMDB Administrator take to improve the CMDB Health? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Remove non-operational and retired CIs"
      },
      {
        "id": "B",
        "text": "Focus on metric(s) with Critical and High priorities"
      },
      {
        "id": "C",
        "text": "Adjust the metrics using exclusion rules to improvelhe scores"
      },
      {
        "id": "D",
        "text": "Use the Remediation Playbooks linked beside each metric"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image102.png",
    "needsReview": false
  },
  {
    "id": "source-t3-055",
    "number": 124,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "Which shows the most complete list of policy types that are provided by the CMDB Data Manager?",
    "choices": [
      {
        "id": "A",
        "text": "Delete, Attestation, Retire, and Certification )"
      },
      {
        "id": "B",
        "text": "Attestation, Retire, and Certification"
      },
      {
        "id": "C",
        "text": "Archive and Delete"
      },
      {
        "id": "D",
        "text": "Retire, Archive, Attestation, Certification, and Delete"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image143.png",
    "needsReview": false
  },
  {
    "id": "source-t3-056",
    "number": 125,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "The CMDB Administrator group seeks to filler specific CI classes that display on the CMDB Health Dashboard. This ensures that only relevant data is displayed, excluding\nitems that are not ready for management.\nWhich feature can the group utilize to achieve this goal?\n[Y",
    "choices": [
      {
        "id": "A",
        "text": "Reconciliation Rules"
      },
      {
        "id": "B",
        "text": "Identification Rules"
      },
      {
        "id": "C",
        "text": "Data Refresh Rules"
      },
      {
        "id": "D",
        "text": "Health Inclusion Rules"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image84.png",
    "needsReview": false
  },
  {
    "id": "source-t3-057",
    "number": 126,
    "category": "CMDB Governance and Health",
    "type": "multiple",
    "prompt": "A CMDB Administrator is using the Duplicate CI Remediator to address a de-duplication task. On the first lab of the wizard, the Main CI is selected.\nWhich attributes are used to identify the Main CI? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Least Related Items"
      },
      {
        "id": "B",
        "text": "Most Related Items"
      },
      {
        "id": "C",
        "text": "Newest Created"
      },
      {
        "id": "D",
        "text": "Oldest Created"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image150.png",
    "needsReview": false
  },
  {
    "id": "source-t3-058",
    "number": 127,
    "category": "CMDB Governance and Health",
    "type": "single",
    "prompt": "A Configuration Manager needs to enable a CMDB Data Manager policy to remove records from a CI Class while retaining the ability to restore them within a specified\nperiod.\nWhich policy type should the Configuration Manager create?",
    "choices": [
      {
        "id": "A",
        "text": "Archive"
      },
      {
        "id": "B",
        "text": "Retire"
      },
      {
        "id": "C",
        "text": "Certification"
      },
      {
        "id": "D",
        "text": "Delete\n\n[3"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image133.png",
    "needsReview": false
  },
  {
    "id": "source-t4-001",
    "number": 128,
    "category": "CMDB Insights and Value",
    "type": "matching",
    "prompt": "DRAG DROP -\nA manufacturing organization has implemented Incident Management in ServiceNow and wants to integrate additional products to enhance its functionality.\nDrag each ServiceNow product to the value it brings to supporting Incident Management.\n| Delivers asset actions and events for the management and\n| Hardware Asset Management BN ] | maintenance of assets during incidents\n. E\u00e2\u20ac\" \u00e2\u20ac\" - Supplies critical IT and financial risk data, enabling the team to ass\n| Risk Management | | the broader impact of incidents on business operations\n| Service Portfolio Management | | Offers detailed operational-level data on hardware and application !\nto improve incident resolution\nProvides life cycle information about services, helping to align\n| incidents with the status and history of services",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Hardware Asset Management: asset actions and events; Risk Management: IT and financial risk data; Discovery: infrastructure operational data; Service Portfolio Management: service lifecycle information.",
    "image": "questions/image37.png",
    "needsReview": false
  },
  {
    "id": "source-t4-002",
    "number": 129,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "Where can a CMDB 360/Multisource CMDB Saved Query be viewed and created in the CMDB Workspace?",
    "choices": [
      {
        "id": "A",
        "text": "Saved queries window on the Insight tab"
      },
      {
        "id": "B",
        "text": "CMDB Query Builder"
      },
      {
        "id": "C",
        "text": "Coverage window on the CMDB 360 tab ;"
      },
      {
        "id": "D",
        "text": "Saved queries window on the CMDB 360 tab"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image67.png",
    "needsReview": false
  },
  {
    "id": "source-t4-003",
    "number": 130,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "An organization is changing data centers and needs to know the consequences of the planned changes.\nHow can Application Service mapping be used as part of Chinge Management?",
    "choices": [
      {
        "id": "A",
        "text": "To understand the physical location of CIs"
      },
      {
        "id": "B",
        "text": "To identify which devices will go offline first"
      },
      {
        "id": "C",
        "text": "To understand the business impact of CIs"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image30.png",
    "needsReview": false
  },
  {
    "id": "source-t4-004",
    "number": 131,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "Where can an administrator perform Natural Language Queries (NLQ)?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Data Manager"
      },
      {
        "id": "B",
        "text": "CI Class Manager"
      },
      {
        "id": "C",
        "text": "CMDB Workspace"
      },
      {
        "id": "D",
        "text": "CMDB Health Dashboard"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image114.png",
    "needsReview": false
  },
  {
    "id": "source-t4-005",
    "number": 132,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A healthcare provider faces a critical incident affecting its patient management system. The provider needs to determine the users impacted to mitigate disruption\neffectively.\nWhich CSDM-related data should they leverage?",
    "choices": [
      {
        "id": "A",
        "text": "Incident history of similar CIs"
      },
      {
        "id": "B",
        "text": "Application Service environment attribute"
      },
      {
        "id": "C",
        "text": "Service Offerings by Department or Location"
      },
      {
        "id": "D",
        "text": "Affected CI [task_ci] related list"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image152.png",
    "needsReview": false
  },
  {
    "id": "source-t4-006",
    "number": 133,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A Configuration Manager wants to use the Unified Map.\nWhere would it be accessed?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Data Manager\nx"
      },
      {
        "id": "B",
        "text": "CI Class Manager"
      },
      {
        "id": "C",
        "text": "CMDB Workspace"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image35.png",
    "needsReview": false
  },
  {
    "id": "source-t4-007",
    "number": 134,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "A service owner is using Unified Map to understand to composition of a service but wants to filter out irrelevant information.\nWhich options are available to the service owner from the filter panel? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Discovery source"
      },
      {
        "id": "B",
        "text": "CI type"
      },
      {
        "id": "C",
        "text": "Business critically\n\nk"
      },
      {
        "id": "D",
        "text": "Managed by group"
      }
    ],
    "correctAnswers": [
      "A",
      "B"
    ],
    "explanation": "Source answer: A and B.",
    "image": "questions/image100.png",
    "needsReview": false
  },
  {
    "id": "source-t4-008",
    "number": 135,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "A CMDB Administrator wants to create a CMDB query to find all databases located in Seattle that are connected to application services. They also want to include\nincidents related to those databases.\nWhich actions does the company take to build this query? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Add to the canvas the Incident table from the Non-CMDB Tables list"
      },
      {
        "id": "B",
        "text": "Add a filter to the database node for location=Seattle"
      },
      {
        "id": "C",
        "text": "Set the relationship level to 'Up to@nd level relationships'"
      },
      {
        "id": "D",
        "text": "Add property columns to the application service node"
      }
    ],
    "correctAnswers": [
      "A",
      "B"
    ],
    "explanation": "Source answer: A and B.",
    "image": "questions/image86.png",
    "needsReview": false
  },
  {
    "id": "source-t4-009",
    "number": 136,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "The Configuration Management team finds value in the reports from CMDB 360/Multisource CMDB and wants to use it for all CI data.\nWhich must be true in order for CMDB 360/Multisource CMDB to be able to report on and analyze that data?\nx",
    "choices": [
      {
        "id": "A",
        "text": "Reconciliation rules with priorities must be configured."
      },
      {
        "id": "B",
        "text": "The CI data must be from an authorized Service Graph Connector."
      },
      {
        "id": "C",
        "text": "The CI data must go through the IRE."
      },
      {
        "id": "D",
        "text": "ServiceNow Discovery must be used to populate the CI data."
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image104.png",
    "needsReview": false
  },
  {
    "id": "source-t4-010",
    "number": 137,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "ServiceNow Event Management significantly benefits from a well-maintained and properly populated CMDB.\nWhat are key advantages it provides to Event Management? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Correlation of alerts to knowledge base articles N"
      },
      {
        "id": "B",
        "text": "Mapped services provide visibility to the business impact of an alert"
      },
      {
        "id": "C",
        "text": "Binding of alerts to specific CIs"
      },
      {
        "id": "D",
        "text": "Mapped services provide visibility to users consuming the service"
      }
    ],
    "correctAnswers": [
      "B",
      "C"
    ],
    "explanation": "Source answer: B and C.",
    "image": "questions/image17.png",
    "needsReview": false
  },
  {
    "id": "source-t4-011",
    "number": 138,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A CMDB Administrator needs insights inte how their CMDB is configured according to ServiceNow recommended practice.\nWhich should be used?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Health Dashboard"
      },
      {
        "id": "B",
        "text": "CMDB Workspace"
      },
      {
        "id": "C",
        "text": "CMDB Data Manager"
      },
      {
        "id": "D",
        "text": "CMDB Data Foundation Dashboar\u00a5"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image141.png",
    "needsReview": false
  },
  {
    "id": "source-t4-012",
    "number": 139,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "What is the value of using the CMDB in security operations? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Auto-resolves a vulnerability\n\nx"
      },
      {
        "id": "B",
        "text": "Identifies the IT infrastructure with a vulnerability"
      },
      {
        "id": "C",
        "text": "Enables audits and attestations across CIs"
      },
      {
        "id": "D",
        "text": "Allows security team to assess and remediate an incident"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image82.png",
    "needsReview": false
  },
  {
    "id": "source-t4-013",
    "number": 140,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "The CMDB Configuration Management team has successfully developed a healthy and trusted CMDB. They have integrated discovered infrastructure data, accurately\nreferenced non-discoverable data (such as change and support group information), and made the CMDB service-aware using Service Mapping.\nHow will these improvements enhance the change management process? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Provides insight into the potential impact of the change"
      },
      {
        "id": "B",
        "text": "EAsures that no changes result in service downtime, regardless of planning or execution"
      },
      {
        "id": "C",
        "text": "Automatically schedules and deploys changes without human review or approval"
      },
      {
        "id": "D",
        "text": "Enables auto population of the assignment group field to dynamically route changes"
      }
    ],
    "correctAnswers": [
      "A",
      "D"
    ],
    "explanation": "Source answer: A and D.",
    "image": "questions/image166.png",
    "needsReview": false
  },
  {
    "id": "source-t4-014",
    "number": 141,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A CMDB Manager uses CMDB 360/Multisource CMDB to maintain and improve CMDB quality.\nWhy would the Manager use CMDB 360/Multisource CMDB?",
    "choices": [
      {
        "id": "A",
        "text": "To identify CI attributes from multiple data sources N"
      },
      {
        "id": "B",
        "text": "To ingest data from multiple data sources using Import Set(s)"
      },
      {
        "id": "C",
        "text": "To populate the CMDB from multiple data sources"
      },
      {
        "id": "D",
        "text": "To ingest data from multiple data sources using Service Graph Connector(s)"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image97.png",
    "needsReview": false
  },
  {
    "id": "source-t4-015",
    "number": 142,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "A CMDB Administratgr is comparing the Unified Map to the Service Mapping map.\nWhat are additional capabilities of the Unified Map? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Number of levels displayed on a map can be modified"
      },
      {
        "id": "B",
        "text": "Visibility to an application and the host it is installed on"
      },
      {
        "id": "C",
        "text": "Map nodes can be filtered based on user preferences"
      },
      {
        "id": "D",
        "text": "Map can be zoomed in and out"
      }
    ],
    "correctAnswers": [
      "A",
      "C"
    ],
    "explanation": "Source answer: A and C.",
    "image": "questions/image93.png",
    "needsReview": false
  },
  {
    "id": "source-t4-016",
    "number": 143,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A Service Desk Manager wants to leverage the Unified Map te find active incidents or problems for a selected CI.\nWhich panel will give the manager visibility and details?",
    "choices": [
      {
        "id": "A",
        "text": "Overview"
      },
      {
        "id": "B",
        "text": "Attributes"
      },
      {
        "id": "C",
        "text": "Related items\n\n3"
      },
      {
        "id": "D",
        "text": "Application services"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image32.png",
    "needsReview": false
  },
  {
    "id": "source-t4-017",
    "number": 144,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "A CMDB Administrator wants to educate the team on the various actions that can be performed within the CMDB Workspace.\nWhat actions can be initiated from the CMDB Workspace? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Create a new CMDB class"
      },
      {
        "id": "B",
        "text": "Execute ServiceNow thscovery"
      },
      {
        "id": "C",
        "text": "Remediate duplicate CI records"
      },
      {
        "id": "D",
        "text": "Create a CMDB Data Manager certification policy"
      }
    ],
    "correctAnswers": [
      "C",
      "D"
    ],
    "explanation": "Source answer: C and D.",
    "image": "questions/image106.png",
    "needsReview": false
  },
  {
    "id": "source-t4-018",
    "number": 145,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A CMDB Administrator knows that the CMDB Data Foundation Dashboard is a resource to monitor and improve data quality.\nWhat is a benefit of this dashboard?",
    "choices": [
      {
        "id": "A",
        "text": "Provides the ability to resolve certification policy tasks"
      },
      {
        "id": "B",
        "text": "Provides the ability to configure health-related metrics\n\n["
      },
      {
        "id": "C",
        "text": "Provides key health-related metrics to make decisions"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image34.png",
    "needsReview": false
  },
  {
    "id": "source-t4-019",
    "number": 146,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A CMDB Administrator is asked to create a query using the CMDB Query Builder that displays all operational CIs belonging to a specific application service.\nWhich steps provide the desired outcome?",
    "choices": [
      {
        "id": "A",
        "text": "1. Add the Business Application, Application Service, and Configuration Item classes to the canvas.\n2. Define a filter for the application service name and the operational status of the configuration items.\n3. Configure the relationship between the classes.\n4. Run the query."
      },
      {
        "id": "B",
        "text": "1. Add the Application Service and Configuration Item classes to the canvas.\n2. Configure the relationship between the classes.\n3. Define a filter for the application service name and the operational status of the configuration items.\n4. Run the query.\nY"
      },
      {
        "id": "C",
        "text": "1. Add the Application Service and Configuration Item classes to the canvas.\n2. Configure the relationship between the classes.\n3. Add the Operational Status and Name fields as columns.\n4. Run the query."
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image110.png",
    "needsReview": false
  },
  {
    "id": "source-t4-020",
    "number": 147,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "A Configuration Manager wants to explore ServiceNow CMDB 360 saved queries to see if the reports can assist with managing of CMDB data.\nWhat insights are gained from CMDB 360 queries? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Gaps in attribute data from different data sources"
      },
      {
        "id": "B",
        "text": "Unique CIs created from different data sources"
      },
      {
        "id": "C",
        "text": "Different attribute values from different data sources"
      },
      {
        "id": "D",
        "text": "Orphan CIs created from different data sources"
      },
      {
        "id": "E",
        "text": "Duplicate configuration items from different data sources"
      }
    ],
    "correctAnswers": [
      "A",
      "C"
    ],
    "explanation": "Source answer: A and C.",
    "image": "questions/image137.png",
    "needsReview": false
  },
  {
    "id": "source-t4-021",
    "number": 148,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "A CMDB Administrator wants to leverage the CMDB Data Foundations Dashboard.\nWhat are benefits of using this application?",
    "choices": [
      {
        "id": "A",
        "text": "Checks that important data is valid and properly configured"
      },
      {
        "id": "B",
        "text": "Has a framework to create custom metrics for the CMDB x"
      },
      {
        "id": "C",
        "text": "Provides playbooks to assist in the remediation of potential risks"
      },
      {
        "id": "D",
        "text": "Uses automation to remediate potential risks"
      }
    ],
    "correctAnswers": [
      "A",
      "C"
    ],
    "explanation": "Source answer: A and C.",
    "image": "questions/image149.png",
    "needsReview": false
  },
  {
    "id": "source-t4-022",
    "number": 149,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A Service Owner needs to view related items, such as Active Incidents and Planned Changes, directly on the home node of the Unified Map.\nWhich work area would allow the Service Owner to meet this goal?",
    "choices": [
      {
        "id": "A",
        "text": "Map"
      },
      {
        "id": "B",
        "text": "Tool box"
      },
      {
        "id": "C",
        "text": "Content controls"
      },
      {
        "id": "D",
        "text": "Contextual side panel\n\n: x"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image109.png",
    "needsReview": false
  },
  {
    "id": "source-t4-023",
    "number": 150,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A CMDB Administrator wants to use the CMDB and CSDM Data Foundations Dashboard.\nWhere can the Administrator obtain the dashboard?",
    "choices": [
      {
        "id": "A",
        "text": "Itis a free application on the ServiceNow Innovation Lab."
      },
      {
        "id": "B",
        "text": "Itis active by default."
      },
      {
        "id": "C",
        "text": "Itis a free application on the ServiceNow Store."
      },
      {
        "id": "D",
        "text": "Itis a paid application on the ServiceNow Store. N"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image85.png",
    "needsReview": false
  },
  {
    "id": "source-t4-024",
    "number": 151,
    "category": "CMDB Insights and Value",
    "type": "single",
    "prompt": "A Configuration Manager working in the CMDB Workspace wants to see how CIs are connected to each other.\nWhich tool can be used?",
    "choices": [
      {
        "id": "A",
        "text": "Relationship Map"
      },
      {
        "id": "B",
        "text": "Business Service Map"
      },
      {
        "id": "C",
        "text": "Unified Map\n\n[Y"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image26.png",
    "needsReview": false
  },
  {
    "id": "source-t4-025",
    "number": 152,
    "category": "CMDB Insights and Value",
    "type": "multiple",
    "prompt": "An organization is using CMDB Query Builder to find all application services with a database that has incidents and all infrastructure in those application services.\nWhich steps does the organization take to build this query? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Use a CMDB Query to include application services and their related infrastructure"
      },
      {
        "id": "B",
        "text": "Use a Service Mapping Query to find all incidents related to the database"
      },
      {
        "id": "C",
        "text": "Use a Service Mapping Query to include non-CMDB tables like the Incident table"
      },
      {
        "id": "D",
        "text": "Add a non-CMDB table to the query\n="
      }
    ],
    "correctAnswers": [
      "A",
      "D"
    ],
    "explanation": "Source answer: A and D.",
    "image": "questions/image52.png",
    "needsReview": false
  },
  {
    "id": "source-t5-001",
    "number": 153,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "In a company there is a need to understand the CSDM maturity level needed. Different stakeholders listed a number of use cases that they expect over time.\nWhich use case requires information objects?",
    "choices": [
      {
        "id": "A",
        "text": "The Event Operations team wants to automate their events into incident for operational actions.\n\nA"
      },
      {
        "id": "B",
        "text": "The Business Service Management team wants to understand the operational impact for their consumer parties."
      },
      {
        "id": "C",
        "text": "The Customer Service team wants to onboard pro-active case management."
      },
      {
        "id": "D",
        "text": "The SecOps team wants to understand the operational risk in the Business Application context."
      },
      {
        "id": "E",
        "text": "The Asset Management wants to understand to asset life cycle compliancy in a Business Application context."
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image46.png",
    "needsReview": false
  },
  {
    "id": "source-t5-002",
    "number": 154,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A Platform Owner is collaborating with stakeholders in the manufacturing industry to align their CIs with the CSDM 5 framework. They need to map production line\nmonitoring systems to the appropriate CSDM domain.\nWhich CSDM 5 domain does the Platform Owner use?",
    "choices": [
      {
        "id": "A",
        "text": "Build and Integration (Build)"
      },
      {
        "id": "B",
        "text": "Service Delivery (Manage Technical)"
      },
      {
        "id": "C",
        "text": "Service Consumption (Sell/Consume)"
      },
      {
        "id": "D",
        "text": "Design and Planning (Design)"
      },
      {
        "id": "E",
        "text": "Foundation"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image154.png",
    "needsReview": false
  },
  {
    "id": "source-t5-003",
    "number": 155,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "k\nA development team is working on a project and an application will be deployed to many servers. There will be several security requirements that must be checked to\nadhere to lawful compliance because the application will be holding customer personal data (Pll and PCI).\nWhere in the CSDM does the development team look to store the information that will be used to satisfy the audits?",
    "choices": [
      {
        "id": "A",
        "text": "Technology Management Service Offerings (Technical Service Offerings) and Dynamic CI Groups"
      },
      {
        "id": "B",
        "text": "Business Applications and Information Objects"
      },
      {
        "id": "C",
        "text": "Customer Service Offerings and Databases"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image27.png",
    "needsReview": false
  },
  {
    "id": "source-t5-004",
    "number": 156,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A customer's CMDB is aligned to the CSDM Walk stage.\nWhat benefit is provided by the CMDB?",
    "choices": [
      {
        "id": "A",
        "text": "Enables impact assessments for incident, problem, and change on Business Services"
      },
      {
        "id": "B",
        "text": "Improves the implementation velocity of APM Foundation for future business application rationalization\nI"
      },
      {
        "id": "C",
        "text": "Allows for additional stratification of Technical team's support structure along the lines of OLAs and commitments"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image78.png",
    "needsReview": false
  },
  {
    "id": "source-t5-005",
    "number": 157,
    "category": "CSDM Fundamentals",
    "type": "matching",
    "prompt": "DRAG DROP -\nSome steps need to be taken to transition from using different status attributes in the CMDB to life cycle objects.\nDrag and drop the objectives/attributes to the description.\nlife_cycle_ stage status | Answer Area\n8 This table is pre-populated with mappings for legacy status value\nlife_cycle_object | based on its table, to the best-fit CSDM life-cycle value pair.\n. . This is a record attribute that reflects a meta-level state of the rec\nlife_cycle_mapping | life cycle.\n| life_cycle_stage | This is a record attribute that reflects a sub-level state of the reco\noT a life cycle.\nThis table uses the type of CI (hardware, document, logical, etc.)\ndetermine which sub-level life cycle state values are available.",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: life_cycle_mapping: legacy-to-CSDM mappings; life_cycle_stage: meta-level lifecycle state; life_cycle_stage_status: sub-level state; life_cycle_object: determines allowed sub-level values by CI type.",
    "image": "questions/image139.png",
    "needsReview": false
  },
  {
    "id": "source-t5-006",
    "number": 158,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nA CMDB Administrator wants to improve data quality related to the CSDM.\nWhich action should the Administrator take to meet this goal?",
    "choices": [
      {
        "id": "A",
        "text": "Use the default configured CMDB Health Dashboard"
      },
      {
        "id": "B",
        "text": "Start the ServiceNow Health Scan"
      },
      {
        "id": "C",
        "text": "Use the CSDM Data Foundation Dashboard\n\n[)"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image33.png",
    "needsReview": false
  },
  {
    "id": "source-t5-007",
    "number": 159,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "According to the Common Service Data Model (CSDM), a server team is requesting a catalog item be created for infrastructure upgrade requests.\nWhich role is involved in initiating the request and defining requirements?",
    "choices": [
      {
        "id": "A",
        "text": "Enterprise Architecture"
      },
      {
        "id": "B",
        "text": "Technology Service Owners"
      },
      {
        "id": "C",
        "text": "Application Service Owners"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image158.png",
    "needsReview": false
  },
  {
    "id": "source-t5-008",
    "number": 160,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "x\nA CMDB Administrator is evaluating whether to monitor the metrics provided on the CMDB Foundation Dashboard.\nWhich benefits support the decision to continually menitor the results on this dashboard? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Provides a list of all CIs that failed health audits"
      },
      {
        "id": "B",
        "text": "Provides metrics for CIs Processed by the IRE"
      },
      {
        "id": "C",
        "text": "Provides metrics on active CIs updated in the last 90 days"
      },
      {
        "id": "D",
        "text": "Reports on all orphan CIs in the CMDB"
      }
    ],
    "correctAnswers": [
      "B",
      "C"
    ],
    "explanation": "Source answer: B and C.",
    "image": "questions/image40.png",
    "needsReview": false
  },
  {
    "id": "source-t5-009",
    "number": 161,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "The Configuration Manager is preparing the justification to utilize the CMDB Data Foundations Dashboard.\nWhich benefits align with the usage of this dashboard? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "It enables monitoring and tracking of CMDB health over time."
      },
      {
        "id": "B",
        "text": "It provides actionable insights to improve data quality and completeness.\n\n_ . ["
      },
      {
        "id": "C",
        "text": "It helps detect and eliminate duplicate records in the CMDB."
      },
      {
        "id": "D",
        "text": "It automates the approval process for change management."
      }
    ],
    "correctAnswers": [
      "A",
      "B"
    ],
    "explanation": "Source answer: A and B.",
    "image": "questions/image5.png",
    "needsReview": false
  },
  {
    "id": "source-t5-010",
    "number": 162,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "A Change Manager wants to gain value from CSDM.\nHow will the Change Management process benefit from CSDM? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Identify blackout windows for the change"
      },
      {
        "id": "B",
        "text": "Determine the root cause of the change issue"
      },
      {
        "id": "C",
        "text": "Understand the impact of the change on services"
      },
      {
        "id": "D",
        "text": "Route the change dynamically"
      }
    ],
    "correctAnswers": [
      "C",
      "D"
    ],
    "explanation": "Source answer: C and D.",
    "image": "questions/image118.png",
    "needsReview": false
  },
  {
    "id": "source-t5-011",
    "number": 163,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "Which are business values of CMDB? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Collecting and managing financial data"
      },
      {
        "id": "B",
        "text": "Streaming incident and change management\nx"
      },
      {
        "id": "C",
        "text": "Strengthening operational resiliency"
      },
      {
        "id": "D",
        "text": "Automating maintenance for CI relationships"
      }
    ],
    "correctAnswers": [
      "B",
      "C"
    ],
    "explanation": "Source answer: B and C.",
    "image": "questions/image60.png",
    "needsReview": false
  },
  {
    "id": "source-t5-012",
    "number": 164,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A CMDB Administrator is implementing a Vulnerability Response or Security Incident Response and needs to ensure customers have enough context to estimate risk and\nset task priorities.\nWhich Get Well Playbook from the CSDM Data Foundation Dashboard helps with this?",
    "choices": [
      {
        "id": "A",
        "text": "Locations without a Parent Location"
      },
      {
        "id": "B",
        "text": "Named Product Models without Product Owners"
      },
      {
        "id": "C",
        "text": "Percentage of Custom Status Values for CI Life Cycle Stages"
      },
      {
        "id": "D",
        "text": "Application Services with Business Application Relationships"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image28.png",
    "needsReview": false
  },
  {
    "id": "source-t5-013",
    "number": 165,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "A CMDB Administrator wants to run the Services Have Owners Identified playbook lo remediate the issues shown in the CMDB Data Foundations Dashboard.\nWhich remediation plays would be used? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Govern Data"
      },
      {
        "id": "B",
        "text": "Fix Data"
      },
      {
        "id": "C",
        "text": "Report Data"
      },
      {
        "id": "D",
        "text": "Analyze Data"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image74.png",
    "needsReview": false
  },
  {
    "id": "source-t5-014",
    "number": 166,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A Configuration Management Governance team is transitioning from utilizing legacy CMDB status fields to CSDM life cycle status fields.\nWhich table can be modified?\n1 A. Life Cycle Stages [life_cycle_stage]",
    "choices": [
      {
        "id": "B",
        "text": "Life Cycle Mapping [life_cycle_mapping]"
      },
      {
        "id": "C",
        "text": "Life Cycle Controls [life_cycle_control]"
      },
      {
        "id": "D",
        "text": "Life Cycle Stage Status [life_cycle_stage_status]"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image56.png",
    "needsReview": false
  },
  {
    "id": "source-t5-015",
    "number": 167,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A CMDB Administrator, viewing the CMDB Data Foundations Dashboard, notices the Unique Locations Result percentage low.\nWhat is the recommended process from the associated playbook to correct this issue?",
    "choices": [
      {
        "id": "A",
        "text": "Review both locations, update CIs with the correct location and delete the duplicate location"
      },
      {
        "id": "B",
        "text": "Retain the location that matches the organization's standard naming convention, and delete the duplicate without further validation"
      },
      {
        "id": "C",
        "text": "Keep both locations as either can be used as a valid alternate location"
      },
      {
        "id": "D",
        "text": "Use the Duplicate CI Remediator the merge the duplicate location records"
      }
    ],
    "correctAnswers": [
      "A"
    ],
    "explanation": "Source answer: A.",
    "image": "questions/image72.png",
    "needsReview": false
  },
  {
    "id": "source-t5-016",
    "number": 168,
    "category": "CSDM Fundamentals",
    "type": "matching",
    "prompt": "DRAG DROP -\nA CMDB Owner starts on the CSDM journey and needs to become familiar with the CSDM domains.\nDrag the CMDB objects to the correct CSDM domains.\n\n| Application Service | Answer Area\n\n_ I Design and Planning domain\n| Business Application | -\n. Foundation domain\n| Business Process | : _ I\n| Business Service | | Service Delivery domain\nI ~ | Sell / Consume domain\nx",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Design and Planning: Business Application; Foundation: Business Process; Service Delivery: Application Service; Sell / Consume: Business Service.",
    "image": "questions/image51.png",
    "needsReview": true
  },
  {
    "id": "source-t5-017",
    "number": 169,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A Configuration Manager is planning the implementation of the CMDB.\nWhich is the prescribed CSDM rollout order?",
    "choices": [
      {
        "id": "A",
        "text": "Architecture, Business, Technical, Governance\n\nx"
      },
      {
        "id": "B",
        "text": "Initiate, Plan, Execute, Deliver, Close"
      },
      {
        "id": "C",
        "text": "Foundaticn, Crawl, Walk, Run, Fly"
      },
      {
        "id": "D",
        "text": "Initial, Developing, Defined, Managed"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image15.png",
    "needsReview": false
  },
  {
    "id": "source-t5-018",
    "number": 170,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A customer wants to model their business applications and would like to capture different types of data that includes Personally Identifiable Informaticn (PII) data.\nBased on these requirements, which CMDB class needs to be leveraged to achieve this?",
    "choices": [
      {
        "id": "A",
        "text": "API Component"
      },
      {
        "id": "B",
        "text": "Information Object"
      },
      {
        "id": "C",
        "text": "Business Capability"
      },
      {
        "id": "D",
        "text": "Data Classification"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image44.png",
    "needsReview": false
  },
  {
    "id": "source-t5-019",
    "number": 171,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A CSDM Data Manager needs metrics on the alignment of product models, locations, and business units with best practices.\nWhich tab in the CSDM Data Foundations Dashboard provides this information?",
    "choices": [
      {
        "id": "A",
        "text": "Fly"
      },
      {
        "id": "B",
        "text": "Crawl"
      },
      {
        "id": "C",
        "text": "Foundation"
      },
      {
        "id": "D",
        "text": "Run"
      },
      {
        "id": "E",
        "text": "walk *"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image117.png",
    "needsReview": false
  },
  {
    "id": "source-t5-020",
    "number": 172,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nA Service Portfolio Manager wants to know what Application Services their Business Service Offerings depend on.\nWhat stage of CSDM would map this relationship?",
    "choices": [
      {
        "id": "A",
        "text": "Foundation ;"
      },
      {
        "id": "B",
        "text": "Fly"
      },
      {
        "id": "C",
        "text": "Run"
      },
      {
        "id": "D",
        "text": "Walk"
      },
      {
        "id": "E",
        "text": "Crawl"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image73.png",
    "needsReview": false
  },
  {
    "id": "source-t5-021",
    "number": 173,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nAn Enterprise Architect of a financial services company is working across the enterprise and wants to track their capabilities.\nWhich CSDM 5 domain is used?",
    "choices": [
      {
        "id": "A",
        "text": "Build and Integration (Build) \\"
      },
      {
        "id": "B",
        "text": "Design and Planning (Design)"
      },
      {
        "id": "C",
        "text": "Service Delivery (Manage Technical)"
      },
      {
        "id": "D",
        "text": "Service Consumption (Sell/Consume)"
      },
      {
        "id": "E",
        "text": "Foundation"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image105.png",
    "needsReview": false
  },
  {
    "id": "source-t5-022",
    "number": 174,
    "category": "CSDM Fundamentals",
    "type": "matching",
    "prompt": "DRAG DROP\nGiven a list of Service types in the platform. Drag the appropriate service to its definition.\nAnswer Area\nApplication Service Logie representation of a deploy system or application\n. . Published to Service Owners and underpins one or more\nBusiness Service . a .\nbusiness or application Services.\nTechnolegy Management Published to Business Users and underpins one or more\nService (Technical Service) business capabilities",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Application Service: logical deployed stack; Technology Management Service / Technical Service: published to service owners and underpins services; Business Service: published to business users and underpins capabilities.",
    "image": "questions/image12.png",
    "needsReview": false
  },
  {
    "id": "source-t5-023",
    "number": 175,
    "category": "CSDM Fundamentals",
    "type": "matching",
    "prompt": "DRAG DROP\nk\nA Platform Owner is building the governance team to support the CSDM.\nDrag the domain to the roles that make up the governance team.\nAnswer Area\nDesign Domain Service Owner(s), Platform Owner\n) ) | | Technology Service Owner(s), Application Service Owner(s),\nFoundation Domain 9y (5). App <)\nPlatform Owner\nPortfolio Domain Enterprise Architect(s), Platform Owner\n| : : | rprise Archi r Pr ner\nTechnical Domain Enterprise Architect(s), Data Steward(s), Process Owner(s),\n| Platform Owner",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Portfolio Domain: Service Owner(s), Platform Owner; Technical Domain: Technology Service Owner(s), Application Service Owner(s), Platform Owner; Design Domain: Enterprise Architect(s), Platform Owner; Foundation Domain: Enterprise Architect(s), Data Steward(s), Process Owner(s), Platform Owner.",
    "image": "questions/image116.png",
    "needsReview": false
  },
  {
    "id": "source-t5-024",
    "number": 176,
    "category": "CSDM Fundamentals",
    "type": "matching",
    "prompt": "\u00a7\nDRAG DROP\nAn Enterprise Architect needs to help the CMDB owner understand the benefits of CSDM.\nDrag the CSDM domains to the respective benefits.\nAnswer Area\n. Understand CIs related to business application and related capabilities to identify\nFoundation . . .\nredundancies, monitor costs and make better investment decisions around roadmap\nDesign and Planning Understand technical services, technical service offerings, service support and\nall relationships to underlying technology CIs\nService Consumption . . . .\nP Understand business services and ownership, cost, scope of what is offered to the\nbusiness/consumer and request access to the business services\nService Delivery )\nJ Use the base system tables when implementing the CSDM to derive the highest\nvalue from ServiceNow products and the Now Platform",
    "choices": [
      {
        "id": "REVEAL",
        "text": "Reveal and review the source answer"
      }
    ],
    "correctAnswers": [
      "REVEAL"
    ],
    "explanation": "Source answer: Design and Planning: understand applications, capabilities, redundancy, cost, and roadmaps; Service Delivery: understand technical services, offerings, support, and underlying CIs; Service Consumption: understand business services, ownership, cost, scope, and access; Foundation: use base-system CSDM tables.",
    "image": "questions/image157.png",
    "needsReview": false
  },
  {
    "id": "source-t5-025",
    "number": 177,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nA health organization must track certain data (for example, regulated patient information) and its relation to Business Applications.\nWhich action does CSDM recommend to meet this goal?",
    "choices": [
      {
        "id": "A",
        "text": "Create fields on the Business Application record to mark the Business Application as containing patient information, and then ask the Business Application owner\n10 mark the application as having patient information or not."
      },
      {
        "id": "B",
        "text": "Work with the Database administration team to classify the data on each database that holds patient information, and then use Relationships to map that back to\nthe Business Application."
      },
      {
        "id": "C",
        "text": "Create an information Object to represent the patient information, and then link it through a relationship to the Business Application after consultpg with the\nApplication owner."
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image49.png",
    "needsReview": false
  },
  {
    "id": "source-t5-026",
    "number": 178,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A CMDB Architect intends to populate the CMDB using the CSDM guidance\nWhich key stakeholders from the organization should be involved in decisions regarding population of the CMDB using the CSDM Crawl Stage?",
    "choices": [
      {
        "id": "A",
        "text": "Business Service Manager, Technology Service Owner"
      },
      {
        "id": "B",
        "text": "Application Owner, Application Service Owner"
      },
      {
        "id": "C",
        "text": "Customer Service Manager, Infrastructure Manager\n\n[YS"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image36.png",
    "needsReview": false
  },
  {
    "id": "source-t5-027",
    "number": 179,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nA hospital has received a new CT Scanner. The inventory management team has created a catalog item doctors can use to schedule patients for scans.\nWhat CSOM domain should the inventory management team map the catalog item to?",
    "choices": [
      {
        "id": "A",
        "text": "Foundation"
      },
      {
        "id": "B",
        "text": "Design and Planning (Design)"
      },
      {
        "id": "C",
        "text": "Service Delivery (Manage Technical Service)"
      },
      {
        "id": "D",
        "text": "Service Consumption (Sell/Consume)\nAE. Build and Integration (Build)"
      }
    ],
    "correctAnswers": [
      "D"
    ],
    "explanation": "Source answer: D.",
    "image": "questions/image111.png",
    "needsReview": false
  },
  {
    "id": "source-t5-028",
    "number": 180,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nA CSDM Data Manager needs metrics on the alignment of Technology Management Services (Technical Services) and Technology Management Offerings (Technical\nService Offerings) with best practices.\nWhich tab in the CSOM Data Foundation Dashboard provides this information?",
    "choices": [
      {
        "id": "A",
        "text": "Crawl"
      },
      {
        "id": "B",
        "text": "Run\nL"
      },
      {
        "id": "C",
        "text": "Walk"
      },
      {
        "id": "D",
        "text": "Fly"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image3.png",
    "needsReview": false
  },
  {
    "id": "source-t5-029",
    "number": 181,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A CMDB Architect intends to build a CMDB using CSDM guidance.\nWhich CMDB tables will the architect use to build the CSDM sell/consume domain?",
    "choices": [
      {
        "id": "A",
        "text": "Business Capability, Information Object, Business Application"
      },
      {
        "id": "B",
        "text": "Business Service Offering, Business Service"
      },
      {
        "id": "C",
        "text": "Application Service, Technology Management Service (Technical Service), Technology Management Offering (Technical Service Offering)"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image144.png",
    "needsReview": false
  },
  {
    "id": "source-t5-030",
    "number": 182,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nThe Application Portfolio Management team is asking for help modeling platforms as Business Applications.\nHow would this be mapped in CSDM using the ServiceNow Platform in the Incident and Change applications?",
    "choices": [
      {
        "id": "A",
        "text": "ServiceNow Platform, Incident, and Change would all be web based Architecture type,\n\nIncident and Change would have a reference to ServiceNow Platform."
      },
      {
        "id": "B",
        "text": "ServiceNew Platform would be an Architecture type of Platform Host\n\nIncident and Change would be Platform Applications and have a reference toerviceNow Platform."
      },
      {
        "id": "C",
        "text": "ServiceNow Platform, Incident, and Change would all be web based Architecture type.\n\nA Depends On relationship would be created between ServiceNow Platform and Incident and Change."
      },
      {
        "id": "D",
        "text": "ServiceNow Platform would be an Architecture type of Platform Host.\n\nIncident and Change would be Platform Applications.\n\nThen a Depends On relationship would be created between ServiceNow Platform and Incident and Change."
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image91.png",
    "needsReview": false
  },
  {
    "id": "source-t5-031",
    "number": 183,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A Manager needs information on how to correctly establish relationships between Infrastructure CIs, Technolegy Management Offerings (Technical Service Offerings),\nand Application Services within the CMDB.\nWhich CSDM domain would provide this information?",
    "choices": [
      {
        "id": "A",
        "text": "Design and Planning (Ddsign)"
      },
      {
        "id": "B",
        "text": "Service Consumption (Sell / Consume)"
      },
      {
        "id": "C",
        "text": "Service Delivery (Manage Technical Services)"
      },
      {
        "id": "D",
        "text": "Build and Integration (Build)"
      },
      {
        "id": "E",
        "text": "Foundation"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image31.png",
    "needsReview": false
  },
  {
    "id": "source-t5-032",
    "number": 184,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A retail organization needs to ensure that incidents affecting customer-facing services are resolved quickly to reduce potential revenue loss.\nWhich CSDM attribute is used to prioritize these services?",
    "choices": [
      {
        "id": "A",
        "text": "Assignment Group on the CI record"
      },
      {
        "id": "B",
        "text": "Affected CIs in the Incident record\n\n. Ce . 3"
      },
      {
        "id": "C",
        "text": "Business Criticality in the Service Offering"
      },
      {
        "id": "D",
        "text": "Service classification in the Technical Service"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image92.png",
    "needsReview": false
  },
  {
    "id": "source-t5-033",
    "number": 185,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "\u00a7\nA CMDB Manager wants to start adding CSDM design and planning (design) domain components into the CMDB.\nWho is involved in this exercise? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Application Service Owner"
      },
      {
        "id": "B",
        "text": "Enterprise Architect"
      },
      {
        "id": "C",
        "text": "Business Relationship Manager"
      },
      {
        "id": "D",
        "text": "Application Qwner x"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image124.png",
    "needsReview": false
  },
  {
    "id": "source-t5-034",
    "number": 186,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nA company wants to track regulatory compliance. ServiceNow has an artifact type called an information object as part of the CSDM framework.\nWhat is the purpose of an information object?",
    "choices": [
      {
        "id": "A",
        "text": "It describes data in general on a group of Configuration Items."
      },
      {
        "id": "B",
        "text": "It describes data exchanged between an API interface and an Application,\n\n. . . k"
      },
      {
        "id": "C",
        "text": "It describes the logical data to the Business Applications."
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image50.png",
    "needsReview": false
  },
  {
    "id": "source-t5-035",
    "number": 187,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "The ITSM Manager wants to use Technology Management Offerings (Technical Service Offerings) to populate the support group of associated CIs.\nWhat CSDM stage would this be completed in?",
    "choices": [
      {
        "id": "A",
        "text": "Run"
      },
      {
        "id": "B",
        "text": "Walk"
      },
      {
        "id": "C",
        "text": "Foundation"
      },
      {
        "id": "D",
        "text": "Fly"
      },
      {
        "id": "E",
        "text": "Crawl\n\nk"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image121.png",
    "needsReview": false
  },
  {
    "id": "source-t5-036",
    "number": 188,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "\u00a7\nA Configuration Manager is implementing end to end service modeling and wants to get help on status and playbooks for improving the quality.\nWhat does the Configuration Manager reference to obtain guidance?",
    "choices": [
      {
        "id": "A",
        "text": "CMDB Data Foundation Dashboard"
      },
      {
        "id": "B",
        "text": "Service Mapping Data Foundation Dashboard"
      },
      {
        "id": "C",
        "text": "CSDM Data Foundation Dashboard"
      },
      {
        "id": "D",
        "text": "CMDB Workspace\n\nk"
      }
    ],
    "correctAnswers": [
      "C"
    ],
    "explanation": "Source answer: C.",
    "image": "questions/image165.png",
    "needsReview": false
  },
  {
    "id": "source-t5-037",
    "number": 189,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "\u00a7\nA CMDB Administrator is leveraging CI data as part of an Integrated Risk Management implementation and the Entity Scoping process. The Administrator wants to\nleverage the CSDM Data Foundations Dashboard playbooks under the Run tab.\nWhich CSDM relationships are leveraged using the CSDM playbooks? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Business Applications that have their relationships to Information Objects"
      },
      {
        "id": "B",
        "text": "Business Applications that have relationships to Application Services"
      },
      {
        "id": "C",
        "text": "Logical CIs that have relationships with Information Objects"
      },
      {
        "id": "D",
        "text": "Locations that have established parent records k"
      }
    ],
    "correctAnswers": [
      "A",
      "B"
    ],
    "explanation": "Source answer: A and B.",
    "image": "questions/image148.png",
    "needsReview": false
  },
  {
    "id": "source-t5-038",
    "number": 190,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "\u00a7\nThe Incident Process Owner asks which classes of CSDM are used on the Incident form.\nWhich classes are appropriate? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Application Service"
      },
      {
        "id": "B",
        "text": "Service Offering"
      },
      {
        "id": "C",
        "text": "Business Application"
      },
      {
        "id": "D",
        "text": "Service Portfolio"
      }
    ],
    "correctAnswers": [
      "A",
      "B"
    ],
    "explanation": "Source answer: A and B.",
    "image": "questions/image101.png",
    "needsReview": false
  },
  {
    "id": "source-t5-039",
    "number": 191,
    "category": "CSDM Fundamentals",
    "type": "single",
    "prompt": "A Business Relationship Manager in an organization wants to implement Service Portfolio Management (SPM) and to present offerings to business consumers.\nWhich CSDM Domain daes this align with?",
    "choices": [
      {
        "id": "A",
        "text": "Design and Planning (Design)"
      },
      {
        "id": "B",
        "text": "Service Consumption (Sell/Consume)"
      },
      {
        "id": "C",
        "text": "Service Delivery"
      },
      {
        "id": "D",
        "text": "Build and Integration (Build)"
      }
    ],
    "correctAnswers": [
      "B"
    ],
    "explanation": "Source answer: B.",
    "image": "questions/image115.png",
    "needsReview": false
  },
  {
    "id": "source-t5-040",
    "number": 192,
    "category": "CSDM Fundamentals",
    "type": "multiple",
    "prompt": "How is the CMDB aligned to business processes? (Choose two.)",
    "choices": [
      {
        "id": "A",
        "text": "Enables the CFO/CIO 10 track software licenses"
      },
      {
        "id": "B",
        "text": "Enhances decision-making and operational efficiency across the organization"
      },
      {
        "id": "C",
        "text": "Extends service delivery management to all enterprise departments"
      },
      {
        "id": "D",
        "text": "Provides a centralized view of configuration items and their relationships"
      }
    ],
    "correctAnswers": [
      "B",
      "D"
    ],
    "explanation": "Source answer: B and D.",
    "image": "questions/image126.png",
    "needsReview": false
  }
]
