import { test, expect } from '@playwright/test';

test.describe('User Flow: Login and Record BMI', () => {

  // Generate a unique email for each test run to avoid conflicts
  const uniqueId = Date.now().toString();
  const email = `user_${uniqueId}@example.com`;
  const password = 'password123';
  const name = 'Test User';

  test('Complete User Journey: Register, Login, and Record BMI', async ({ page }) => {
    
    // 1. Register a new user
    await page.goto('/auth/register');
    await page.getByLabel('Full Name').fill(name);
    await page.getByLabel('Email Address').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Register' }).click();
    
    // Verify redirected to sign in
    await expect(page).toHaveURL(/.*\/auth\/signin/);

    // 2. Login
    await page.getByLabel('Email Address').fill(email);
    await page.getByLabel('Password').fill(password);
    await page.getByRole('button', { name: 'Sign In' }).click();

    // Verify redirected to dashboard
    await expect(page).toHaveURL(/.*\/dashboard/);
    await expect(page.getByText(`Hello, ${name}`)).toBeVisible();

    // 3. Record BMI
    // The dashboard has inputs for Weight and Height.
    // We didn't add labels with htmlFor in dashboard yet, so we use placeholder or closest text.
    // Looking at the code:
    // <label>Weight (kg)</label><input placeholder="70">
    // Playwright's getByLabel should work if the text is associated or close enough, 
    // but explicit labels are better. Let's try getByPlaceholder first or getByText if needed.
    // The previous turn I didn't update dashboard inputs to have IDs.
    // So getByLabel might not work perfectly unless wrapped. 
    // In dashboard/page.tsx: <label ...>Weight (kg)</label> <input ...> (siblings in a div)
    // Playwright might not find it via getByLabel without 'for'.
    // Safe bet: getByPlaceholder.

    await page.getByPlaceholder('70').fill('75'); // Weight
    await page.getByPlaceholder('175').fill('180'); // Height
    
    await page.getByRole('button', { name: 'Calculate & Save' }).click();

    // 4. Verify Record
    // Should see "Latest BMI"
    await expect(page.getByText('Latest BMI')).toBeVisible();
    
    // Calculate expected BMI: 75 / (1.8 * 1.8) = 23.148... -> 23.1
    await expect(page.getByText('23.1')).toBeVisible();
    
    // Category for 23.1 is Normal
    await expect(page.getByText('Normal')).toBeVisible();
  });

});
