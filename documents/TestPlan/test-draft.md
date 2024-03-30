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
  - \usepackage{enumerate}
  - \usepackage{longtable}
  - \usepackage{amsmath,amsfonts,amssymb}
  - \usepackage{setspace}
  - \usepackage{float}
  - \usepackage{tabularray}
  - \usepackage{multicol}
  - \usepackage{xcolor}
  - \usepackage[hidelinks]{hyperref}
  - \usepackage{listings}
  - \definecolor{codegreen}{rgb}{0,0.6,0}
  - \definecolor{codegray}{rgb}{0.5,0.5,0.5}
  - \definecolor{codepurple}{rgb}{0.58,0,0.82}
  - \definecolor{backcolour}{rgb}{0.95,0.95,0.92}
  - \pagenumbering{gobble}
  - \renewcommand{\arraystretch}{1.5}
  - \usepackage{mathtools}
  - \usepackage{longtable}
  - \usepackage{graphicx}
  - \usepackage{multirow}
  - \usepackage{hhline}
  - \usepackage[utf8]{inputenc}
  - \usepackage[usestackEOL]{stackengine}
  - \setlength{\abovedisplayskip}{0in}
  - \setlength{\columnsep}{3em}
  - \newcommand{\blue}{\color{Blue}}
  - \newcommand{\green}{\color{Green}}
  - \usepackage[inkscapeformat=png]{svg}
  - \newcommand{\red}{\color{Red}}
  - \newcommand{\black}{\color{Black}}
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
\lstdefinestyle{mystyle}{
backgroundcolor=\color{backcolour},  
 commentstyle=\color{codegreen},
keywordstyle=\color{magenta},
numberstyle=\tiny\color{codegray},
stringstyle=\color{codepurple},
basicstyle=\ttfamily\footnotesize,
breakatwhitespace=false,  
 breaklines=true,  
 captionpos=b,  
 keepspaces=true,  
 numbers=left,  
 numbersep=5pt,  
 showspaces=false,  
 showstringspaces=false,
showtabs=false,  
 tabsize=2
}

\SetTblrDefault{%
stretch = 1.5,
hlines, vlines,
columns={c},
}

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

\begin{longtblr}[
caption = {Authentication Module Unit Test},
label = {tab:test},
]{
colspec = {|X[1.5]X[2]X[3]X[3]X[5]X[5]X[1.5]|}, % Adjusted to 6 columns
rowhead = 1,
hlines,
row{even} = {gray9},
row{1} = {olive9},
}

\hline
\textbf{S.No} & \textbf{Module Name} & \textbf{Function} & \textbf{Conditions to be tested} & \textbf{Inputs} & \textbf{Expected Output} & \textbf{Status} \\
\hline
UT-1.1.a & Login Module & Login user using Interanl sign-in &Incorrect Credentials & user: unknown-username \textbf{or} wrong-password, DB-status: user-not-found \textbf{or} wrong-password (from User Module) & return: invalid-credentials & F \\\hline
UT-1.1.b & Login Module & Login User using Google OAuth &Incorrect Credentials (OAuth) & user: incorrect-email \textbf{or} wrong-password, OAuth-status: user-not-registered \textbf{or} wrong-password (from OAuth) & return: invalid-credentials & F \\\hline
UT-1.1.c & Login Module& Login User & Correct Credentials & user: registered-username \textbf{and} correct-password, DB-status: OK (from User Module or OAuth) & return: OK \textbf{and} JSON Web-token & P \\\hline
UT-1.2.a & Token Module & Validate JWT & Invalid Token & cookie: invalid-token & The module extracts the header and the payload from the request and recalculates the signature and matches it with the token, in this case it does not match and hence returns \textbf{returns:} invalid-token & F \\\hline
UT-1.3.a & Signup Module & Signup User & Username already taken & user: already-taken-username \textbf{and} password \textbf{and} email-id, DB-status: username-taken & return: username-taken & F \\\hline
UT-1.3.b & Signup Module & Signup User & Unverified email id & user: username \textbf{and} password \textbf{and} unverfied-email-id, email-service-status: email-verification-timeout & return: email-unverified & F \\\hline
UT-1.3.c & Signup Module & Signup User & Passwords Don't Match & user: username \textbf{and} invalid-password \textbf{and} email-id & return: password-mismatch & F \\\hline
UT-1.3.d & Signup Module & Signup User & Valid Credentials & user: username \textbf{and} password \textbf{and} email-id, DB-status: user-created & return: user-created \textbf{and} JWT and redirects user to home page & P \\\hline
UT-1.3.a & E2EE Module & TO-BE-FILLED & Invalid Key & & & F \\\hline
\end{longtblr}

#### User Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-2.1.a |             |                         |           |                 |        |

#### System Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-3.1.a |             |                         |           |                 |        |

#### Database Access Module

##### User Record Module

<!-- Create a latex table from the below markdown -->

\begin{longtblr}[
caption = {User Record Module Unit Test},
label = {tab:test},
]{
colspec = {|X[1.5]X[2]X[3]X[4.5]X[4]X[5]X[1.5]|}, % Adjusted to 6 columns
rowhead = 1,
hlines,
row{even} = {gray9},
row{1} = {olive9},
}

\hline
\textbf{S.No} & \textbf{Module Name} & \textbf{Function} & \textbf{Conditions to be tested} & \textbf{Test Data} & \textbf{Expected Output} & \textbf{Status} \\
\hline
UT-4.1.a & User Module & getUser & Invalid Username & user: invalid-user-name & return: invalid-user-name & F \\\hline
UT-4.1.b & User Module & getUser & No User by this Username & user: unknown-user, DB-status: no-such-user & return: no-such-user & F \\\hline
UT-4.1.c & User Module & getUser & Exisiting username & user: username, DB-status: OK & return: OK \textbf{and} user-record & P \\\hline
UT-4.1.d & User Module & updateUser & Invalid Username & user: invalid-user-name & return: invalid-user-name & F \\\hline
UT-4.1.e & User Module & updateUser & No User by this Username & user: username, DB-status: OK & return: OK & F \\\hline
UT-4.1.f & User Module & updateUser & Edit User Settings (User setting is a 6-tuple) - Invalid Tuple - Invalid Profile Visibility & user: new-user-record (invalid integer for profile visibility) & return: invalid-profile-visibility & F \\\hline
UT-4.1.g & User Module & updateUser & Edit User Settings (User setting is a 6-tuple) - Invalid Tuple - Invalid Chat Request Setting & user: new-user-record (invalid integer for chat request) & return: invalid-chat-request-setting & F \\\hline
UT-4.1.h & User Module & updateUser & Edit User Settings (User setting is a 6-tuple) - Invalid Tuple - Invalid Notification Setting - remaining 4 values & user: new-user-record (invalid 4-tuple for notification) & return: invalid-notification-setting & F \\\hline
UT-4.1.i & User Module & updateUser & Edit User Settings (User setting is a 6-tuple) - Valid Tuple & user: username & return: OK & P \\\hline
UT-4.1.j & User Module & updateUser & Edit email-id - Invalid email-id & user: new-user-record (email-id: invalid) & return: invalid-email & F \\\hline
UT-4.1.k & User Module & updateUser & Edit email-id - Valid email-id & user: valid-new-user-record & return: OK & P \\\hline
UT-4.1.l & User Module & updateUser & Edit user bio & user: username, DB-status: OK & return: OK & P \\\hline
UT-4.1.m & User Module & deleteUser & Invalid Username & user: invalid-user, DB-status: user-not-found & return: invalid-user-name & F \\\hline
UT-4.1.n & User Module & deleteUser & No User by this Username & user: username, DB-status: no-such-user & return: no-such-user & F \\\hline
UT-4.1.o & User Module & deleteUser & Exisiting username & user: username, DB-status: OK & return: user-deleted & P \\\hline
\end{longtblr}

<!-- | S.No     | Module Name | Function   | Conditions to be tested                                                                                            | Test Data                                                      | Expected Output                      | Status |
| -------- | ----------- | ---------- | ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- | ------------------------------------ | ------ |
| UT-4.1.a | User Module | getUser    | Invalid Username                                                                                                   | user: invalid-user-name                                        | return: invalid-user-name            | F      |
| UT-4.1.b | User Module | getUser    | No User by this Username                                                                                           | user: unknown-user, DB-status: no-such-user                    | return: no-such-user                 | F      |
| UT-4.1.c | User Module | getUser    | Exisiting username                                                                                                 | user: username, DB-status: OK                                  | return: OK **and** user-record       | P      |
| UT-4.1.d | User Module | updateUser | Invalid Username                                                                                                   | user: invalid-user-name                                        | return: invalid-user-name            | F      |
| UT-4.1.e | User Module | updateUser | No User by this Username                                                                                           | user: username, DB-status: OK                                  | return: OK                           | F      |
| UT-4.1.f | User Module | updateUser | Edit User Settings (User setting is a 6-tuple) - Invalid Tuple - Invalid Profile Visibility                        | user: new-user-record (invalid integer for profile visibility) | return: invalid-profile-visibility   | F      |
| UT-4.1.g | User Module | updateUser | Edit User Settings (User setting is a 6-tuple) - Invalid Tuple - Invalid Chat Request Setting                      | user: new-user-record (invalid integer for chat request)       | return: invalid-chat-request-setting | F      |
| UT-4.1.h | User Module | updateUser | Edit User Settings (User setting is a 6-tuple) - Invalid Tuple - Invalid Notification Setting - remaining 4 values | user: new-user-record (invalid 4-tuple for notification)       | return: invalid-notification-setting | F      |
| UT-4.1.i | User Module | updateUser | Edit User Settings (User setting is a 6-tuple) - Valid Tuple                                                       | user: username                                                 | return: OK                           | P      |
| UT-4.1.j | User Module | updateUser | Edit email-id - Invalid email-id                                                                                   | user: new-user-record (email-id: invalid)                      | return: invalid-email                | F      |
| UT-4.1.k | User Module | updateUser | Edit email-id - Valid email-id                                                                                     | user: valid-new-user-record                                    | return: OK                           | P      |
| UT-4.1.l | User Module | updateUser | Edit user bio                                                                                                      | user: username, DB-status: OK                                  | return: OK                           | P      |
| UT-4.1.m | User Module | deleteUser | Invalid Username                                                                                                   | user: invalid-user, DB-status: user-not-found                  | return: invalid-user-name            | F      |
| UT-4.1.n | User Module | deleteUser | No User by this Username                                                                                           | user: username, DB-status: no-such-user                        | return: no-such-user                 | F      |
| UT-4.1.o | User Module | deleteUser | Exisiting username                                                                                                 | user: username, DB-status: OK                                  | return: user-deleted                 | P      | -->

##### Post Record Module

| S.No     | Module Name | Function              | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| -------- | ----------- | --------------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.e | Post Module | getPost               | Invalid PostID                     | post: unknown-post, status: access-denied | return: access-denied | F      |
| UT-4.1.f | Post Module | getPostByCommunity    | Valid Post, Access available       | post: known-post, status: OK              | return: OK            | P      |
| UT-4.1.g | Post Module | getPostByUser         | Invalid Post, Access not available | post: unknown-post, status: access-denied | return: access-denied | F      |
| UT-4.1.h | Post Module | getPostByScore        | Valid Post, Access available       | post: known-post, status: OK              | return: OK            | P      |
| UT-4.1.i | Post Module | getPostByTag          | Invalid Post, Access not available | post: unknown-post, status: access-denied | return: access-denied | F      |
| UT-4.1.j | Post Module | getPostByQueryString  | Valid Post, Access available       | post: known-post, status: OK              | return: OK            | P      |
| UT-4.1.k | Post Module | Access Post Community | Invalid Post, Access not available | post: unknown-post, status: access-denied | return: access-denied | F      |
| UT-4.1.l | Post Module | Access Post Community | Valid Post, Access available       | post: known-post, status: OK              | return: OK            | P      |

##### Comment Record Module

| S.No     | Module Name    | Function             | Conditions to be tested               | Test Data                                       | Expected Output       | Status |
| -------- | -------------- | -------------------- | ------------------------------------- | ----------------------------------------------- | --------------------- | ------ |
| UT-4.1.m | Comment Module | Access Comment Info  | Invalid Comment, Access not available | comment: unknown-comment, status: access-denied | return: access-denied | F      |
| UT-4.1.n | Comment Module | Access Comment Info  | Valid Comment, Access available       | comment: known-comment, status: OK              | return: OK            | P      |
| Ut-4.1.o | Comment Module | Access Comment Votes | Invalid Comment, Access not available | comment: unknown-comment, status: access-denied | return: access-denied | F      |
| UT-4.1.p | Comment Module | Access Comment Votes | Valid Comment, Access available       | comment: known-comment, status: OK              | return: OK            | P      |
| UT-4.1.q | Comment Module | Access Comment Post  | Invalid Comment, Access not available | comment: unknown-comment, status: access-denied | return: access-denied | F      |
| UT-4.1.r | Comment Module | Access Comment Post  | Valid Comment, Access available       | comment: known-comment, status: OK              | return: OK            | P      |

##### Vote Record Module

| S.No     | Module Name | Function            | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| -------- | ----------- | ------------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.s | Vote Module | Access Vote Info    | Invalid Vote, Access not available | vote: unknown-vote, status: access-denied | return: access-denied | F      |
| UT-4.1.t | Vote Module | Access Vote Info    | Valid Vote, Access available       | vote: known-vote, status: OK              | return: OK            | P      |
| UT-4.1.u | Vote Module | Access Vote Post    | Invalid Vote, Access not available | vote: unknown-vote, status: access-denied | return: access-denied | F      |
| UT-4.1.v | Vote Module | Access Vote Post    | Valid Vote, Access available       | vote: known-vote, status: OK              | return: OK            | P      |
| UT-4.1.w | Vote Module | Access Vote Comment | Invalid Vote, Access not available | vote: unknown-vote, status: access-denied | return: access-denied | F      |
| UT-4.1.x | Vote Module | Access Vote Comment | Valid Vote, Access available       | vote: known-vote, status: OK              | return: OK            | P      |

##### Chat Record Module

| S.No      | Module Name | Function             | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| --------- | ----------- | -------------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.y  | Chat Module | Access Chat Info     | Invalid Chat, Access not available | chat: unknown-chat, status: access-denied | return: access-denied | F      |
| UT-4.1.z  | Chat Module | Access Chat Info     | Valid Chat, Access available       | chat: known-chat, status: OK              | return: OK            | P      |
| UT-4.1.aa | Chat Module | Access Chat Messages | Invalid Chat, Access not available | chat: unknown-chat, status: access-denied | return: access-denied | F      |
| UT-4.1.ab | Chat Module | Access Chat Messages | Valid Chat, Access available       | chat: known-chat, status: OK              | return: OK            | P      |

##### Message Record Module

| S.No      | Module Name | Function            | Conditions to be tested               | Test Data                                       | Expected Output       | Status |
| --------- | ----------- | ------------------- | ------------------------------------- | ----------------------------------------------- | --------------------- | ------ |
| UT-4.1.ac | Chat Module | Access Message Info | Invalid Message, Access not available | message: unknown-message, status: access-denied | return: access-denied | F      |

##### Group Record Module

| S.No      | Module Name | Function          | Conditions to be tested             | Test Data                                   | Expected Output       | Status |
| --------- | ----------- | ----------------- | ----------------------------------- | ------------------------------------------- | --------------------- | ------ |
| UT-4.1.ad | Chat Module | Access Group Info | Invalid Group, Access not available | group: unknown-group, status: access-denied | return: access-denied | F      |

##### User_chat Record Module

| S.No      | Module Name | Function              | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| --------- | ----------- | --------------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.ae | Chat Module | Access User Chat Info | Invalid User, Access not available | user: unknown-user, status: access-denied | return: access-denied | F      |

##### User_group Record Module

| S.No      | Module Name | Function               | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| --------- | ----------- | ---------------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.af | Chat Module | Access User Group Info | Invalid User, Access not available | user: unknown-user, status: access-denied | return: access-denied | F      |

##### Community Record Module

| S.No      | Module Name      | Function               | Conditions to be tested                 | Test Data                                           | Expected Output       | Status |
| --------- | ---------------- | ---------------------- | --------------------------------------- | --------------------------------------------------- | --------------------- | ------ |
| UT-4.1.ac | Community Module | Access Community Info  | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied | F      |
| UT-4.1.ad | Community Module | Access Community Info  | Valid Community, Access available       | community: known-community, status: OK              | return: OK            | P      |
| UT-4.1.ae | Community Module | Access Community Posts | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied | F      |
| UT-4.1.af | Community Module | Access Community Posts | Valid Community, Access available       | community: known-community, status: OK              | return: OK            | P      |
| UT-4.1.ag | Community Module | Access Community Users | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied | F      |
| UT-4.1.ah | Community Module | Access Community Users | Valid Community, Access available       | community: known-community, status: OK              | return: OK            | P      |
| UT-4.1.ai | Community Module | Access Community Mods  | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied | F      |
| UT-4.1.aj | Community Module | Access Community Mods  | Valid Community, Access available       | community: known-community, status: OK              | return: OK            | P      |

##### Joined Community Record Module

| S.No      | Module Name      | Function                | Conditions to be tested                 | Test Data                                           | Expected Output       | Status |
| --------- | ---------------- | ----------------------- | --------------------------------------- | --------------------------------------------------- | --------------------- | ------ |
| UT-4.1.ak | Community Module | Access Joined Community | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied | F      |

##### Blocked User Record Module

| S.No      | Module Name | Function            | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| --------- | ----------- | ------------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.al | User Module | Access Blocked User | Invalid User, Access not available | user: unknown-user, status: access-denied | return: access-denied | F      |

##### Reported User Record Module

| S.No      | Module Name | Function             | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| --------- | ----------- | -------------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.am | User Module | Access Reported User | Invalid User, Access not available | user: unknown-user, status: access-denied | return: access-denied | F      |

##### Roles Record Module

| S.No      | Module Name | Function          | Conditions to be tested            | Test Data                                 | Expected Output       | Status |
| --------- | ----------- | ----------------- | ---------------------------------- | ----------------------------------------- | --------------------- | ------ |
| UT-4.1.an | User Module | Access User Roles | Invalid User, Access not available | user: unknown-user, status: access-denied | return: access-denied | F      |

#### UI Module

| S.No     | Module Name    | Function       | Conditions to be tested                | Test Data                                                 | Expected Output             | Status |
| -------- | -------------- | -------------- | -------------------------------------- | --------------------------------------------------------- | --------------------------- | ------ |
| UT-5.1.a | Listing Module | List Community | Invalid Communities                    | community: unknown-community, status: community-not-found | return: community-not-found | F      |
| UT-5.1.b | Listing Module | List Community | Valid Communities                      | community: known-community, status: OK                    | return: OK                  | P      |
| UT-5.1.c | Listing Module | List Posts     | Invalid Posts, Access not available    | post: unknown-post, status: access-denied                 | return: access-denied       | F      |
| UT-5.1.d | Listing Module | List Posts     | Valid Posts, Access available          | post: known-post, status: OK                              | return: OK                  | P      |
| UT-5.1.e | Listing Module | List Comments  | Invalid Comments, Access not available | comment: unknown-comment, status: access-denied           | return: access-denied       | F      |
| UT-5.1.f | Listing Module | List Comments  | Valid Comments, Access available       | comment: known-comment, status: OK                        | return: OK                  | P      |
| UT-5.1.g | Listing Module | List Users     | Invalid Users                          | user: unknown-user, status: user-not-found                | return: user-not-found      | F      |
| UT-5.1.h | Listing Module | List Users     | Valid Users                            | user: known-user, status: OK                              | return: OK                  | P      |

#### Other Module

| S.No     | Module Name         | Conditions to be tested | Test Data                                                          | Expected Output                | Status |
| -------- | ------------------- | ----------------------- | ------------------------------------------------------------------ | ------------------------------ | ------ |
| UT-6.1.a | Notification Module | Invalid Notification    | notification: unknown-notification, status: notification-not-found | return: notification-not-found | F      |
| UT-6.1.b |                     | Valid Notification      | notification: known-notification, status: OK                       | return: OK                     | P      |
| UT-6.1.c | Reporting Module    | Invalid Report          | report: unknown-report, status: report-not-found                   | return: report-not-found       | F      |
| UT-6.1.d |                     | Valid Report            | report: known-report, status: OK                                   | return: OK                     | P      |
| UT-6.1.e | Moderation Module   | Invalid Moderation      | moderation: unknown-moderation, status: moderation-not-found       | return: moderation-not-found   | F      |
| UT-6.1.f |                     | Valid Moderation        | moderation: known-moderation, status: OK                           | return: OK                     | P      |

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
