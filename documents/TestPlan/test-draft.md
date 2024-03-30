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
colspec = {|X[2]X[2]X[4]X[6]X[6]X[2]|}, % Adjusted to 6 columns
rowhead = 1,
hlines,
row{even} = {gray9},
row{1} = {olive9},
}

\hline
\textbf{S.No} & \textbf{Module Name} & \textbf{Conditions to be tested} & \textbf{Inputs} & \textbf{Expected Output} & \textbf{Status} \\
\hline
UT-1.1.a & Login Module & Incorrect Credentials & user: unknown-username \textbf{o} wrong-password, status: user-not-found \textbf{or} wrong-password (from User Module) & return: invalid-credentials & F \\\hline
UT-1.1.b & Login Module & Incorrect Credentials (OAuth) & user: incorrect-email \textbf{or} wrong-password, status: user-not-registered \textbf{or} wrong-password (from OAuth) & return: invalid-credentials & F \\\hline
UT-1.1.c & Login Module & Correct Credentials & user: registered-username \textbf{and} correct-password, status: OK (from User Module or OAuth) & return: OK \textbf{and} JSON Web-token & P \\\hline
UT-1.1.d & Token Module & Invalid Token & & & F \\\hline
UT-1.1.e & Signup Module & Invalid Credentials & & & F \\\hline
UT-1.1.f & Signup Module & Valid Credentials & & & P \\\hline
UT-1.1.g & E2EE Module & Invalid Key & & & F \\\hline
\end{longtblr}

| S.No     | Module Name   | Conditions to be tested       | Inputs                                                                                                        | Expected Output                   | Status |
| :------- | :------------ | :---------------------------- | :------------------------------------------------------------------------------------------------------------ | :-------------------------------- | :----- |
| UT-1.1.a | Login Module  | Incorrect Credentials         | user: unknown-username **or** wrong-password, status: user-not-found **or** wrong-password (from User Module) | return: invalid-credentials       | F      |
| UT-1.1.b |               | Incorrect Credentials (OAuth) | user: incorrect-email **or** wrong-password, status: user-not-registered **or** wrong-password (from OAuth)   | return: invalid-credentials       | F      |
| UT-1.1.c |               | Correct Credentials           | user: registered-username **and** correct-password, status: OK (from User Module or OAuth)                    | return: OK **and** JSON Web-token | P      |
| UT-1.1.d | Token Module  | Invalid Token                 |                                                                                                               |                                   | F      |
| UT-1.1.e | Signup Module | Invalid Credentials           |                                                                                                               |                                   | F      |
| UT-1.1.f |               | Valid Credentials             |                                                                                                               |                                   | P      |
| UT-1.1.g | E2EE Module   | Invalid Key                   |                                                                                                               |                                   | F      |

#### User Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-2.1.a |             |                         |           |                 |        |

#### System Module

| S.No     | Module Name | Conditions to be tested | Test Data | Expected Output | Status |
| -------- | ----------- | ----------------------- | --------- | --------------- | ------ |
| UT-3.1.a |             |                         |           |                 |        |

#### DB Access Module

| S.No      | Module Name      | Function               | Conditions to be tested                 | Test Data                                           | Expected Output        | Status |
| --------- | ---------------- | ---------------------- | --------------------------------------- | --------------------------------------------------- | ---------------------- | ------ |
| UT-4.1.a  | User Module      | Access User Info       | Invalid User                            | user: unknown-user, status: user-not-found          | return: user-not-found | F      |
| UT-4.1.b  | User Module      | Access User Info       | Valid User                              | user: known-user, status: OK                        | return: OK             | P      |
| UT-4.1.c  | User Module      | Access User Followings | Invalid User, Access not available      | user: unknown-user, status: access-denied           | return: access-denied  | F      |
| UT-4.1.d  | User Module      | Access User Followings | Valid User, Access available            | user: known-user, status: OK                        | return: OK             | P      |
| UT-4.1.e  | Post Module      | Access Post Info       | Invalid Post, Access not available      | post: unknown-post, status: access-denied           | return: access-denied  | F      |
| UT-4.1.f  | Post Module      | Access Post Info       | Valid Post, Access available            | post: known-post, status: OK                        | return: OK             | P      |
| UT-4.1.g  | Post Module      | Access Post Comments   | Invalid Post, Access not available      | post: unknown-post, status: access-denied           | return: access-denied  | F      |
| UT-4.1.h  | Post Module      | Access Post Comments   | Valid Post, Access available            | post: known-post, status: OK                        | return: OK             | P      |
| UT-4.1.i  | Post Module      | Access Post Votes      | Invalid Post, Access not available      | post: unknown-post, status: access-denied           | return: access-denied  | F      |
| UT-4.1.j  | Post Module      | Access Post Votes      | Valid Post, Access available            | post: known-post, status: OK                        | return: OK             | P      |
| UT-4.1.k  | Post Module      | Access Post Community  | Invalid Post, Access not available      | post: unknown-post, status: access-denied           | return: access-denied  | F      |
| UT-4.1.l  | Post Module      | Access Post Community  | Valid Post, Access available            | post: known-post, status: OK                        | return: OK             | P      |
| UT-4.1.m  | Comment Module   | Access Comment Info    | Invalid Comment, Access not available   | comment: unknown-comment, status: access-denied     | return: access-denied  | F      |
| UT-4.1.n  | Comment Module   | Access Comment Info    | Valid Comment, Access available         | comment: known-comment, status: OK                  | return: OK             | P      |
| Ut-4.1.o  | Comment Module   | Access Comment Votes   | Invalid Comment, Access not available   | comment: unknown-comment, status: access-denied     | return: access-denied  | F      |
| UT-4.1.p  | Comment Module   | Access Comment Votes   | Valid Comment, Access available         | comment: known-comment, status: OK                  | return: OK             | P      |
| UT-4.1.q  | Comment Module   | Access Comment Post    | Invalid Comment, Access not available   | comment: unknown-comment, status: access-denied     | return: access-denied  | F      |
| UT-4.1.r  | Comment Module   | Access Comment Post    | Valid Comment, Access available         | comment: known-comment, status: OK                  | return: OK             | P      |
| UT-4.1.s  | Vote Module      | Access Vote Info       | Invalid Vote, Access not available      | vote: unknown-vote, status: access-denied           | return: access-denied  | F      |
| UT-4.1.t  | Vote Module      | Access Vote Info       | Valid Vote, Access available            | vote: known-vote, status: OK                        | return: OK             | P      |
| UT-4.1.u  | Vote Module      | Access Vote Post       | Invalid Vote, Access not available      | vote: unknown-vote, status: access-denied           | return: access-denied  | F      |
| UT-4.1.v  | Vote Module      | Access Vote Post       | Valid Vote, Access available            | vote: known-vote, status: OK                        | return: OK             | P      |
| UT-4.1.w  | Vote Module      | Access Vote Comment    | Invalid Vote, Access not available      | vote: unknown-vote, status: access-denied           | return: access-denied  | F      |
| UT-4.1.x  | Vote Module      | Access Vote Comment    | Valid Vote, Access available            | vote: known-vote, status: OK                        | return: OK             | P      |
| UT-4.1.y  | Chat Module      | Access Chat Info       | Invalid Chat, Access not available      | chat: unknown-chat, status: access-denied           | return: access-denied  | F      |
| UT-4.1.z  | Chat Module      | Access Chat Info       | Valid Chat, Access available            | chat: known-chat, status: OK                        | return: OK             | P      |
| UT-4.1.aa | Chat Module      | Access Chat Messages   | Invalid Chat, Access not available      | chat: unknown-chat, status: access-denied           | return: access-denied  | F      |
| UT-4.1.ab | Chat Module      | Access Chat Messages   | Valid Chat, Access available            | chat: known-chat, status: OK                        | return: OK             | P      |
| UT-4.1.ac | Community Module | Access Community Info  | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied  | F      |
| UT-4.1.ad | Community Module | Access Community Info  | Valid Community, Access available       | community: known-community, status: OK              | return: OK             | P      |
| UT-4.1.ae | Community Module | Access Community Posts | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied  | F      |
| UT-4.1.af | Community Module | Access Community Posts | Valid Community, Access available       | community: known-community, status: OK              | return: OK             | P      |
| UT-4.1.ag | Community Module | Access Community Users | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied  | F      |
| UT-4.1.ah | Community Module | Access Community Users | Valid Community, Access available       | community: known-community, status: OK              | return: OK             | P      |
| UT-4.1.ai | Community Module | Access Community Mods  | Invalid Community, Access not available | community: unknown-community, status: access-denied | return: access-denied  | F      |
| UT-4.1.aj | Community Module | Access Community Mods  | Valid Community, Access available       | community: known-community, status: OK              | return: OK             | P      |

#### UI Module

| S.No     | Module Name | Conditions to be tested | Test Data                                  | Expected Output        | Status |
| -------- | ----------- | ----------------------- | ------------------------------------------ | ---------------------- | ------ |
| UT-5.1.a | Listing     | Valid List              | post: known-post, status: OK               | return: OK             | P      |
| UT-5.1.b |             | Invalid List            | post: unknown-post, status: post-not-found | return: post-not-found | F      |

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
