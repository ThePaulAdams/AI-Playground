# FeedbackLoop Spec

## Overview
A SaaS that provides embeddable feedback widgets. Developers can create a "Venture", get a snippet, and collect feedback from their users.

## Requirements
- User can create a new Feedback Venture.
- User can view a dashboard of feedback received for a specific venture.
- System generates a unique public URL/snippet for each venture.
- Public endpoint to submit feedback (Content, Rating, optional Email).

## Acceptance Criteria
- [ ] Venture creation form works and persists to DB.
- [ ] List of ventures displays correctly on the hub.
- [ ] Feedback submission API endpoint validates data.
- [ ] Feedback dashboard shows real-time data for the selected venture.
