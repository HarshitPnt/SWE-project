---
author:
  - Harshit Pant \
    CS21BTECH11021
  - Satpute Aniket Tukaram \
    CS21BTECH11056
  - Mahin Bansal \
    CS21BTECH11034
  - Burra Vishal Mathews \
    CS21BTECH11010
title: Communities A Social Media Platform(SM02)
subtitle: Test Plan
header-includes:
  - '\newcommand{\projectName}{Project Name }'
  - '\newcommand{\coreSystemName}{Core Name }'
  - '\newcommand{\bt}[1]{\fcolorbox{gray}{lightgray}{#1}}'
  - '\usepackage{tocloft}'
  - '\usepackage{graphicx}'
  - '\usepackage{hyperref}'
  - '\usepackage{float}'
  - '\usepackage{glossaries}'
  - '\setglossarystyle{altlistgroup}'
  - '\usepackage{xparse}'
  - '\usepackage{lscape}'
  - '\makenoidxglossaries'
  - '\usepackage{etoolbox}'
  - '\usepackage{xstring}'
  - '\setlength{\aboverulesep}{0pt}'
  - '\setlength{\belowrulesep}{0pt}'
  - '\renewcommand{\arraystretch}{1.3}'
  - '\makeatletter'
documentclass: article
fontsize: 10pt
secnumdepth: 4
classoptions:
  - a4paper
  - portrait
mainfont: Arial.ttf
geometry:
  - top=2cm
  - left=1.5cm
  - right=1.5cm
  - bottom=2cm
---

\renewcommand{\contentsname}{Table of Contents}

\tableofcontents

## Test Overview

Communities is an online social media platform that allows users to create and join communities based on their interests. Users can create communities, post content, comment on posts, and interact with other users. The platform also includes other features such as chat, search, and recommendations and certain level of moderation.

This document outlines the test plan for Communities, including the modules to be tested, the types of tests to be conducted, and the test analysis.

The test plan includes the following operations/modules that will be tested:

- Authentication Modules
  - Login Module
  - Signup Module
  - Token Authentication Module
  - E2EE Module
- User Modules
  - Guest User Module
  - Registered User Module
  - Admin User Module
  - Moderator User Module
  - Superuser Module
- System Modules
  - Cache Manager Module
  - Recommender System Module
  - Job Scheduler Module
  - Services Module
    - Feed Service
    - Comments Service
    - Post Service
    - Search Service
    - Votes Service
    - Chat Service
    - Connections Service
    - Scoring Service
- DB Access Modules
  - User Module
  - Post Module
  - Comment Module
  - Vote Module
  - Chat Module
  - Community Module
- UI Modules
  - Listing Module
- Other Modules
  - Notification Module
  - Reporting Module
  - Moderation Module

The test plan includes the following sections:

- Test Overview: A brief overview of the test plan which also lists the operations/modules that will be tested.
- Test Details: Detailed information about the unit tests, integration testing, system testing, and performance testing.
- Test Analysis: A summary of the test statistics, functional test report, and performance test report.
  - Test Statistics: The number of classes, methods, modules tested, test cases, and test cases failed.
  - Functional Test Report: A summary of the functional test cases for each module, including the type of testing method used.
  - Performance Test Report: A summary of the performance test plan and report.

## Test Details

```text
Integrating testing
    The order in which you will integrate your modules and test cases for integrated modules.
System testing
Performance testing
```

### Unit Tests

#### Authentication Module

| S.No     | Module Name   | Conditions to be tested       | Inputs                                                                            | Expected Output     | Status |
| -------- | ------------- | ----------------------------- | --------------------------------------------------------------------------------- | ------------------- | ------ |
| UT-1.1.a | Login Module  | Incorrect Credentials         | unknown-username, wrong-password, user-not-found (from DB)                        | Invalid Credentials | F      |
| UT-1.1.b |               | Incorrect Credentials (OAuth) | incorrect-email, wrong-password, user-not-registered, wrong-password (from OAuth) | Invalid Credentials | F      |
| UT-1.1.c |               | Correct Credentials           |                                                                                   |                     | P      |
| UT-1.1.d | Token Module  | Invalid Token                 |                                                                                   |                     | F      |
| UT-1.1.e | Signup Module | Invalid Credentials           |                                                                                   |                     | F      |
| UT-1.1.f |               | Valid Credentials             |                                                                                   |                     | P      |
| UT-1.1.g | E2EE Module   | Invalid Key                   |                                                                                   |                     | F      |

#### User Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-2.1.a |             |                         |           |                 |        |

#### System Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-3.1.a |             |                         |           |                 |        |

#### DB Access Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-4.1.a |             |                         |           |                 |        |

#### UI Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-5.1.a |             |                         |           |                 |        |

#### Other Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-6.1.a |             |                         |           |                 |        |

### Integration Testing

```text
Integrating different modules and testing
    Unit tested submodules combined and tested
    Use bottom-up approach for integration of modules
```

| S.No | Modules Integrated | Condition to be tested | Test Data | Expected Output | Status |
| ---- | ------------------ | ---------------------- | --------- | --------------- | ------ |
| 1.1  |                    |                        |           |                 |        |

### System Testing

```text
Testing of system as a whole
```

### Performance Testing

```text
Performance testing plan
```

## Test Analysis

```text
We discussed the following seven types of black box testing in the class: equivalence class partitioning, boundary value analysis, cause-effect graphing, pair-wise testing, special cases, error guessing and state based testing. Which of these methods did you use for generating the test cases, for which modules and the count of test cases. Report this functional test summary in the form of a table.

Performance test plan/report
```

### Test Statistics

- Number of classes:
- Number of methods:
- Number of modules tested:
- Number of test cases:
- Number of test cases failed:

### Functional Test Report

```text
Functional test summary in the form of a table
    Test case count for each module
    Type of testing method used
        equivalence class partitioning
        boundary value analysis
        cause-effect graphing
        pair-wise testing
        special cases
        error guessing
        state based testing
```

| S.No | Module Name | Test Case Count | Testing Method |
| ---- | ----------- | --------------- | -------------- |

### Performance Test Report
