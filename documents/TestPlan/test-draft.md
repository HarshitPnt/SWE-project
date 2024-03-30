---
geometry: margin=2cm
output: pdf_document
---

# Test Plan

## Communities : A Social Media Platform(SM02)

- Harshit Pant(CS21BTECH11021)
- Satpute Aniket Tukaram(CS21BTECH11056)
- Mahin Bansal(CS21BTECH11034)
- Burra Vishal Mathews(CS21BTECH11010)

## Table of Contents

- [Test Plan](#test-plan)
  - [Communities : A Social Media Platform(SM02)](#communities--a-social-media-platformsm02)
  - [Table of Contents](#table-of-contents)
  - [Test Overview](#test-overview)
  - [Test Details](#test-details)
    - [Unit Tests](#unit-tests)
      - [Type of Module](#type-of-module)
    - [Integration Testing](#integration-testing)
    - [System Testing](#system-testing)
    - [Performance Testing](#performance-testing)
  - [Test Analysis](#test-analysis)
    - [Test Statistics](#test-statistics)
    - [Functional Test Report](#functional-test-report)
    - [Performance Test Report](#performance-test-report)

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
Unit tests for the modules
Integrating testing
    The order in which you will integrate your modules and test cases for integrated modules.
System testing
Performance testing
```

### Unit Tests

```text
List of all operations/modules that you plan to test
Table of test cases for each module
```

#### Type of Module

| S.No | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| ---- | ----------- | ----------------------- | --------- | --------------- | ------ |
| 1.1  |             |                         |           |                 |        |

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
