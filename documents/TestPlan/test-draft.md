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

<!-- Convert into Latex Table -->

\begin{longtblr}[
caption = {Post Record Module Unit Test},
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
UT-4.2.a & Post Module & get Post & Invalid PostID/Deleted PostID & post: unknown-post-id, DB-status: post-id-not-found & return: post-not-found & F \\\hline
UT-4.2.b & Post Module & get Post By Community & Invalid CommunityID/ Deleted Community & community: unknown-community-id \textbf{and} sort: sort-by \textbf{and} filter: filter-by, DB-status: community-not-found & return: community-not-found & F \\\hline
UT-4.2.c & Post Module & get Post By Community & Invalid Sort-By & community: community-id \textbf{and} sort: invalid-sort-by \textbf{and} filter: filter-by & return: invalid-sort & F \\\hline
UT-4.2.d & Post Module & get Post By Community & Invalid Filter-by & community: community-id \textbf{and} sort: sort-by \textbf{and} filter: invalid-filter-by & return: invalid-filter-by & F \\\hline
UT-4.2.e & Post Module & get Post By Community & Valid Request & community: community-id \textbf{and} sort: sort-by \textbf{and} filter: filter-by, DB-status: OK & return: OK \textbf{and} post-list & F \\\hline
UT-4.2.f & Post Module & get Post By User & Invalid UserID & post: unknown-user-id \textbf{and} sort: sort-by \textbf{and} filer: filter-by, DB-status: user-not-found & return: user-not-found & F \\\hline
UT-4.2.g & Post Module & get Post By User & Valid Request & post: user-id \textbf{and} sort: sort-by \textbf{and} filer: filter-by, DB-status: OK & return: OK \textbf{and} post-list & P \\\hline
UT-4.2.h & Post Module & get Post By User & Invalid Sort-By & post: user-id \textbf{and} sort: invalid-sort-by \textbf{and} filer: filter-by & return: invalid-sort & F \\\hline
UT-4.2.i & Post Module & get Post By User & Invalid Filter-by & post: user-id \textbf{and} sort: sort-by \textbf{and} filer: invalid-filter-by & return: invalid-filter-by & F \\\hline
UT-4.2.j & Post Module & get Post By Score User & Invalid UserID (Used for user-feed generation) & post: unknown-user-id, DB-status: user-not-found & return: user-not-found & F \\\hline
UT-4.2.k & Post Module & get Post By Score Trending & Valid Request & no-input & return: post-list & P \\\hline
UT-4.2.l & Post Module & get Post By Tag & Invalid TagID & tag: unknown-tag-id \textbf{and} sort: sort-by \textbf{and} filter: filter-by, DB-status: tag-not-found & return: tag-not-found & F \\\hline
UT-4.2.m & Post Module & get Post By Tag & Invalid Sort-By & tag: tag-id \textbf{and} sort: invalid-sort-by \textbf{and} filter: filter-by & return: invalid-sort & F \\\hline
UT-4.2.n & Post Module & get Post By Tag & Invalid Filter-By & tag: tag-id \textbf{and} sort: sort-by \textbf{and} filter: invalid-filter-by & return: invalid-filter-by & F \\\hline
UT-4.2.o & Post Module & get Post By Tag & Valid Request & tag: tag-id \textbf{and} sort: sort-by \textbf{and} filter: filter-by, DB-status: OK & return: OK \textbf{and} post-list & P \\\hline
UT-4.2.p & Post Module & get Post By Query String & Invalid Sort-By & query-string: search-string \textbf{and} sort: invalid-sort-by \textbf{and} filter: filter-by & return: invalid-sort-by & F \\\hline
UT-4.2.q & Post Module & get Post By Query String & Invalid Filter-By & query-string: search-string \textbf{and} sort: sort-by \textbf{and} filter: invalid-filter-by & return: invalid-filter-by & F \\\hline
UT-4.2.r & Post Module & get Post By Query String & Valid Request & query-string: search-string \textbf{and} sort: sort-by \textbf{and} filter: filter-by, DB-status: OK & return: OK \textbf{and} post-list & P \\\hline
UT-4.2.s & Post Module & update Post & Invalid PostID & post: unknown-post-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.2.t & Post Module & delete Post & Invalid PostID & post: post-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.2.u & Post Module & delete Post By User & invalid UserID & post: user-id, DB-status: user-not-found & return: user-not-found & F \\\hline
UT-4.2.v & Post Module & delete Post By User & valid UserID & post: user-id, DB-status: OK & return: OK & P \\\hline
UT-4.2.w & Post Module & delete Post By Community & invalid CommunityID & post: community-id, DB-status : community-not-found & return: community-not-found & F \\\hline
UT-4.2.x & Post Module & delete Post By Community & valid CommunityID & post: community-id, DB-status: OK & return: OK & P \\\hline
\end{longtblr}

<!-- | S.No     | Module Name | Function                 | Conditions to be tested                        | Test Data                                                                                                       | Expected Output              | Status |
| -------- | ----------- | ------------------------ | ---------------------------------------------- | --------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------ |
| UT-4.2.a | Post Module | getPost                  | Invalid PostID/Deleted PostID                  | post: unknown-post-id, DB-status: post-id-not-found                                                             | return: post-not-found       | F      |
| UT-4.2.b | Post Module | getPostByCommunity       | Invalid CommunityID/ Deleted Community         | community: unknown-community-id **and** sort: sort-by **and** filter: filter-by, DB-status: community-not-found | return: community-not-found  | F      |
| UT-4.2.c | Post Module | getPostByCommunity       | Invalid Sort-By                                | community: community-id **and** sort: invalid-sort-by **and** filter: filter-by                                 | return: invalid-sort         | F      |
| UT-4.2.d | Post Module | getPostByCommunity       | Invalid Filter-by                              | community: community-id **and** sort: sort-by **and** filter: invalid-filter-by                                 | return: invalid-filter-by    | F      |
| UT-4.2.e | Post Module | getPostByCommunity       | Valid Request                                  | community: community-id **and** sort: sort-by **and** filter: filter-by, DB-status: OK                          | return: OK **and** post-list | F      |
| UT-4.2.f | Post Module | getPostByUser            | Invalid UserID                                 | post: unknown-user-id **and** sort: sort-by **and** filer: filter-by, DB-status: user-not-found                 | return: user-not-found       | F      |
| UT-4.2.g | Post Module | getPostByUser            | Valid Request                                  | post: user-id **and** sort: sort-by **and** filer: filter-by, DB-status: OK                                     | return: OK **and** post-list | P      |
| UT-4.2.h | Post Module | getPostByUser            | Invalid Sort-By                                | post: user-id **and** sort: invalid-sort-by **and** filer: filter-by                                            | return: invalid-sort         | F      |
| UT-4.2.i | Post Module | getPostByUser            | Invalid Filter-by                              | post: user-id **and** sort: sort-by **and** filer: invalid-filter-by                                            | return: invalid-filter-by    | F      |
| UT-4.2.j | Post Module | getPostByScoreUser       | Invalid UserID (Used for user-feed generation) | post: unknown-user-id, DB-status: user-not-found                                                                | return: user-not-found       | F      |
| UT-4.2.k | Post Module | getPostByScoreTrending   | Valid Request                                  | no-input                                                                                                        | return: post-list            | P      |
| UT-4.2.l | Post Module | getPostByTag             | Invalid TagID                                  | tag: unknown-tag-id **and** sort: sort-by **and** filter: filter-by, DB-status: tag-not-found                   | return: tag-not-found        | F      |
| UT-4.2.m | Post Module | getPostByTag             | Invalid Sort-By                                | tag: tag-id **and** sort: invalid-sort-by **and** filter: filter-by                                             | return: invalid-sort         | F      |
| UT-4.2.n | Post Module | getPostByTag             | Invalid Filter-By                              | tag: tag-id **and** sort: sort-by **and** filter: invalid-filter-by                                             | return: invalid-filter-by    | F      |
| UT-4.2.o | Post Module | getPostByTag             | Valid Request                                  | tag: tag-id **and** sort: sort-by **and** filter: filter-by, DB-status: OK                                      | return: OK **and** post-list | P      |
| UT-4.2.p | Post Module | getPostByQueryString     | Invalid Sort-By                                | query-string: search-string **and** sort: invalid-sort-by **and** filter: filter-by                             | return: invalid-sort-by      | F      |
| UT-4.2.q | Post Module | getPostByQueryString     | Invalid Filter-By                              | query-string: search-string **and** sort: sort-by **and** filter: invalid-filter-by                             | return: invalid-filter-by    | F      |
| UT-4.2.r | Post Module | getPostByQueryString     | Valid Request                                  | query-string: search-string **and** sort: sort-by **and** filter: filter-by, DB-status: OK                      | return: OK **and** post-list | P      |
| UT-4.2.s | Post Module | update Post              | Invalid PostID                                 | post: unknown-post-id, DB-status: post-not-found                                                                | return: post-not-found       | F      |
| UT-4.2.t | Post Module | delete Post              | Invalid PostID                                 | post: post-id, DB-status: post-not-found                                                                        | return: post-not-found       | F      |
| UT-4.2.u | Post Module | delete Post By User      | invalid UserID                                 | post: user-id, DB-status: user-not-found                                                                        | return: user-not-found       | F      |
| UT-4.2.v | Post Module | delete Post By User      | valid UserID                                   | post: user-id, DB-status: OK                                                                                    | return: OK                   | P      |
| UT-4.2.w | Post Module | delete Post By Community | invalid CommunityID                            | post: community-id, DB-status: community-not-found                                                              | return: community-not-found  | F      |
| UT-4.2.x | Post Module | delete Post By Community | valid CommunityID                              | post: community-id, DB-status: OK                                                                               | return: OK                   | P      | -->

##### Comment Record Module

<!-- Convert into Latex Table -->

\begin{longtblr}[
caption = {Comment Record Module Unit Test},
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
UT-4.3.a & Comment Module & get Comment & Invalid CommentID & comment: unknown-comment-id, DB-status: comment-not-found & return: comment-not-found & F \\\hline
UT-4.3.b & Comment Module & get Comment & Valid Comment & comment: known-comment, DB-status: OK & return: OK \textbf{and} comment & P \\\hline
UT-4.3.c & Comment Module & get Comment By Post & Invalid PostID & post: unknown-post-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.3.d & Comment Module & get Comment By Parent & Invalid Parent CommentID & comment: unknown-comment-id, DB-status: comment-not-found & return: comment-not-found & F \\\hline
UT-4.3.e & Comment Module & get Comment By Parent & Valid Comment & comment: known-comment, status: OK & return: OK \textbf{and} comment & P \\\hline
UT-4.3.f & Comment Module & get Comments By Ancestor & Invalid Ancestor CommentID & comment: unknown-comment-id, DB-status: comment-not-found & return: comment-not-found & F \\\hline
UT-4.3.g & Comment Module & get Comments By Ancestor & Valid Ancestor CommentID & comment: known-comment, status: OK & return: OK \textbf{and} comment & P \\\hline
UT-4.3.h & Comment Module & update Comment & Invalid CommentID & comment: unknown-comment-id, DB-status: comment-not-found & return: comment-not-found & F \\\hline
UT-4.3.i & Comment Module & update Comment & Valid Comment & comment: known-comment, status: OK & return: OK & P \\\hline
UT-4.3.j & Comment Module & delete Comment & Invalid CommentID & comment: unknown-comment-id, DB-status: comment-not-found & return: comment-not-found & F \\\hline
UT-4.3.k & Comment Module & delete Comment & Valid Comment & comment: known-comment, status: OK & return: OK & P \\\hline
UT-4.3.l & Comment Module & delete Comment By Post & Invalid PostID & post: unknown-post-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.3.m & Comment Module & delete Comment By Post & Valid PostID & post: known-post-id, DB-status: OK & return: OK & P \\\hline
\end{longtblr}

<!--
| S.No     | Module Name    | Function                 | Conditions to be tested    | Test Data                                                 | Expected Output            | Status |
| -------- | -------------- | ------------------------ | -------------------------- | --------------------------------------------------------- | -------------------------- | ------ |
| UT-4.3.a | Comment Module | get Comment              | Invalid CommentID          | comment: unknown-comment-id, DB-status: comment-not-found | return: comment-not-found  | F      |
| UT-4.3.b | Comment Module | get Comment              | Valid Comment              | comment: known-comment, DB-status: OK                     | return: OK **and** comment | P      |
| UT-4.3.c | Comment Module | get Comment By Post      | Invalid PostID             | post: unknown-post-id, DB-status: post-not-found          | return: post-not-found     | F      |
| Ut-4.3.d | Comment Module | get Comment By Parent    | Invalid Parent CommentID   | comment: unknown-comment-id, DB-status: comment-not-found | return: comment-not-found  | F      |
| UT-4.3.e | Comment Module | get Comment By Parent    | Valid Comment              | comment: known-comment, status: OK                        | return: OK **and** comment | P      |
| UT-4.3.f | Comment Module | get Comments By Ancestor | Invalid Ancestor CommentID | comment: unknown-comment-id, DB-status: comment-not-found | return: comment-not-found  | F      |
| UT-4.3.g | Comment Module | get Comments By Ancestor | Valid Ancestor CommentID   | comment: known-comment, status: OK                        | return: OK **and** comment | P      |
| UT-4.3.h | Comment Module | update Comment           | Invalid CommentID          | comment: unknown-comment-id, DB-status: comment-not-found | return: comment-not-found  | F      |
| UT-4.3.i | Comment Module | update Comment           | Valid Comment              | comment: known-comment, status: OK                        | return: OK                 | P      |
| UT-4.3.j | Comment Module | delete Comment           | Invalid CommentID          | comment: unknown-comment-id, DB-status: comment-not-found | return: comment-not-found  | F      |
| UT-4.3.k | Comment Module | delete Comment           | Valid Comment              | comment: known-comment, status: OK                        | return: OK                 | P      |
| UT-4.3.l | Comment Module | delete Comment By Post   | Invalid PostID             | post: unknown-post-id, DB-status: post-not-found          | return: post-not-found     | F      |
| UT-4.3.m | Comment Module | delete Comment By Post   | Valid PostID               | post: known-post-id, DB-status: OK                        | return: OK                 | P      | -->

##### Vote Record Module

<!-- Convert into Latex Table -->

\begin{longtblr}[
caption = {Vote Record Module Unit Test},
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
UT-4.4.a & Vote Module & get Vote & Invalid VoteID & vote: unknown-vote-id, DB-status: vote-not-found & return: vote-not-found & F \\\hline
UT-4.4.b & Vote Module & get Vote & Valid Vote & vote: known-vote, DB-status: OK & return: OK \textbf{and} vote & P \\\hline
UT-4.4.c & Vote Module & get Vote By Post & Invalid PostID & post: unknown-post-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.4.d & Vote Module & get Vote-count By Post & Invalid PostID & post: unknown-post-id, DB-status: post-not-found & return: vote-not-found & F \\\hline
UT-4.4.e & Vote Module & get Vote-count By Post & Valid PostID & post: known-post-id, DB-status: OK & return: OK \textbf{and} vote-count & P \\\hline
UT-4.4.f & Vote Module & get Vote By Post & Valid PostID & post: known-post-id, DB-status: OK & return: OK \textbf{and} vote-list & P \\\hline
UT-4.4.g & Vote Module & get Vote By Post-User & Invalid PostID & post: unknown-post-id \textbf{and} user: user-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.4.h & Vote Module & get Vote By Post-User & Invalid UserID & post: post-id \textbf{and} user: unknown-user-id, DB-status: user-not-found & return: user-not-found & F \\\hline
UT-4.4.i & Vote Module & get Vote By Post-User & Valid Request & post: post-id \textbf{and} user: user-id, DB-status: OK & return: OK \textbf{and} vote & P \\\hline
UT-4.4.j & Vote Module & update Vote & Invalid VoteID & vote: unknown-vote-id, DB-status: vote-not-found & return: vote-not-found & F \\\hline
UT-4.4.k & Vote Module & update Vote & Valid Vote & vote: known-vote, DB-status: OK & return: OK & P \\\hline
UT-4.4.l & Vote Module & delete Vote & Invalid VoteID & vote: unknown-vote-id, DB-status: vote-not-found & return: vote-not-found & F \\\hline
UT-4.4.m & Vote Module & delete Vote & Valid Vote & vote: known-vote, DB-status: OK & return: OK & P \\\hline
UT-4.4.n & Vote Module & delete Vote By Post & Invalid PostID & post: unknown-post-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.4.o & Vote Module & delete Vote By Post & Valid PostID & post: known-post-id, DB-status: OK & return: OK & P \\\hline
UT-4.4.p & Vote Module & delete Vote By Post-User & Invalid PostID & post: unknown-post-id \textbf{and} user: user-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.4.q & Vote Module & delete Vote By Post-User & Invalid UserID & post: post-id \textbf{and} user: unknown-user-id, DB-status: user-not-found & return: user-not-found & F \\\hline
UT-4.4.r & Vote Module & update Vote By Post-User & Invalid PostID & post: unknown-post-id \textbf{and} user: user-id, DB-status: post-not-found & return: post-not-found & F \\\hline
UT-4.4.s & Vote Module & update Vote By Post-User & Invalid UserID & post: post-id \textbf{and} user: unknown-user-id, DB-status: user-not-found & return: user-not-found & F \\\hline
UT-4.4.t & Vote Module & update Vote By Post-User & Valid Request & post: post-id \textbf{and} user: user-id, DB-status: OK & return: OK & P \\\hline
\end{longtblr}

<!-- | S.No     | Module Name | Function                 | Conditions to be tested | Test Data                                                              | Expected Output               | Status |
| -------- | ----------- | ------------------------ | ----------------------- | ---------------------------------------------------------------------- | ----------------------------- | ------ |
| UT-4.4.a | Vote Module | get Vote                 | Invalid VoteID          | vote: unknown-vote-id, DB-status: vote-not-found                       | return: vote-not-found        | F      |
| UT-4.4.b | Vote Module | get Vote                 | Valid Vote              | vote: known-vote, DB-status: OK                                        | return: OK **and** vote       | P      |
| UT-4.4.c | Vote Module | get Vote By Post         | Invalid PostID          | post: unknown-post-id, DB-status: post-not-found                       | return: post-not-found        | F      |
| UT-4.4.d | Vote Module | get Vote-count By Post   | Invalid PostID          | post: unknown-post-id, DB-status: post-not-found                       | return: vote-not-found        | F      |
| UT-4.4.e | Vote Module | get Vote-count By Post   | Valid PostID            | post: known-post-id, DB-status: OK                                     | return: OK **and** vote-count | P      |
| UT-4.4.f | Vote Module | get Vote By Post         | Valid PostID            | post: known-post-id, DB-status: OK                                     | return: OK **and** vote-list  | P      |
| UT-4.4.g | Vote Module | get Vote By Post-User    | Invalid PostID          | post: unknown-post-id **and** user: user-id, DB-status: post-not-found | return: post-not-found        | F      |
| UT-4.4.h | Vote Module | get Vote By Post-User    | Invalid UserID          | post: post-id **and** user: unknown-user-id, DB-status: user-not-found | return: user-not-found        | F      |
| UT-4.4.i | Vote Module | get Vote By Post-User    | Valid Request           | post: post-id **and** user: user-id, DB-status: OK                     | return: OK **and** vote       | P      |
| UT-4.4.j | Vote Module | update Vote              | Invalid VoteID          | vote: unknown-vote-id, DB-status: vote-not-found                       | return: vote-not-found        | F      |
| UT-4.4.k | Vote Module | update Vote              | Valid Vote              | vote: known-vote, DB-status: OK                                        | return: OK                    | P      |
| UT-4.4.l | Vote Module | delete Vote              | Invalid VoteID          | vote: unknown-vote-id, DB-status: vote-not-found                       | return: vote-not-found        | F      |
| UT-4.4.m | Vote Module | delete Vote              | Valid Vote              | vote: known-vote, DB-status: OK                                        | return: OK                    | P      |
| UT-4.4.n | Vote Module | delete Vote By Post      | Invalid PostID          | post: unknown-post-id, DB-status: post-not-found                       | return: post-not-found        | F      |
| UT-4.4.o | Vote Module | delete Vote By Post      | Valid PostID            | post: known-post-id, DB-status: OK                                     | return: OK                    | P      |
| UT-4.4.p | Vote Module | delete Vote By Post-User | Invalid PostID          | post: unknown-post-id **and** user: user-id, DB-status: post-not-found | return: post-not-found        | F      |
| UT-4.4.q | Vote Module | delete Vote By Post-User | Invalid UserID          | post: post-id **and** user: unknown-user-id, DB-status: user-not-found | return: user-not-found        | F      |
| UT-4.4.r | Vote Module | update Vote By Post-User | Invalid PostID          | post: unknown-post-id **and** user: user-id, DB-status: post-not-found | return: post-not-found        | F      |
| UT-4.4.s | Vote Module | update Vote By Post-User | Invalid UserID          | post: post-id **and** user: unknown-user-id, DB-status: user-not-found | return: user-not-found        | F      |
| UT-4.4.t | Vote Module | update Vote By Post-User | Valid Request           | post: post-id **and** user: user-id, DB-status: OK                     | return: OK                    | P      | -->

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
