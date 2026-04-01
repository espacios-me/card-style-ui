# Smart Real Estate Investment Page

A data-driven real estate investment interface focused on helping users evaluate opportunities using measurable signals instead of purely visual listings.

## Product direction

This project is designed to become a smart investment page for real estate, centered on:

- project-level investment scoring
- yield and capital growth visibility
- location and infrastructure intelligence
- comparable filtering and search
- analyst-style summaries for investors
- expandable property cards with data-backed detail views

## Core experience

The interface should help a user answer questions like:

- Which projects have the strongest rental yield?
- Which locations show the best projected capital appreciation?
- What is close to schools, hospitals, retail, and key business hubs?
- Which projects match my budget, unit type, and target return?
- Which listings are featured because the data supports them?

## Recommended MVP modules

### 1. Investment dashboard
- active project count
- average yield
- average projected growth
- top-ranked opportunities
- featured data-backed picks

### 2. Search and filtering
- search by project name, developer, and location
- filter by yield band
- filter by projected growth band
- filter by price range
- filter by unit type
- filter by featured or top-scoring opportunities

### 3. Project cards
Each card should show:
- project name
- developer
- location
- estimated rental yield
- projected capital growth
- price band
- travel-time access to key destinations
- featured or score badge

### 4. Project detail sheet
Each detail view should include:
- investment metrics
- nearby schools, hospitals, and retail
- transit and destination access
- score explanation
- investment summary
- call to action for enquiry

### 5. Smart scoring layer
Suggested weighted score inputs:
- rental yield
- projected capital growth
- price accessibility
- destination connectivity
- infrastructure quality
- developer reputation

Example idea:

```ts
score = (
  yieldScore * 0.30 +
  growthScore * 0.25 +
  connectivityScore * 0.15 +
  infrastructureScore * 0.15 +
  developerScore * 0.10 +
  priceScore * 0.05
)
```

## Suggested data model

```ts
{
  id: number,
  name: string,
  developer: string,
  location: string,
  unitType: string,
  price: string,
  yield: string,
  growth: string,
  minsDT: number,
  minsMarina: number,
  schools: string,
  hospitals: string,
  malls: string,
  featured: boolean,
  score: number,
  scoreLabel: string
}
```

## Next build steps

1. initialize the React page scaffold
2. connect the uploaded project dataset
3. calculate investment scores from numeric fields
4. replace mock values with spreadsheet-backed data
5. add sorting and analyst insights
6. prepare for deployment

## Repo structure

```text
src/
  App.jsx
  data/
  components/
  utils/
```

## Notes

The current goal is not just a beautiful UI. The goal is a useful investor tool with a premium visual layer on top of real metrics.
