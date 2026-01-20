import { test, expect } from '@playwright/test';

test.describe('BMI Application Tests', () => {

  test('Case 1: Home Page Loads Correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/BMI Web Application/);
    await expect(page.getByRole('heading', { name: 'BMI Tracker' })).toBeVisible();
    await expect(page.getByText('67162110050-9')).toBeVisible();
  });

  test('Case 2: Navigate to Sign In Page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await expect(page).toHaveURL(/.*\/auth\/signin/);
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('Case 3: Navigate to Register Page', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Register' }).click();
    await expect(page).toHaveURL(/.*\/auth\/register/);
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });

  test('Case 4: Register Page Has Correct Form Elements', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page.getByLabel('Full Name')).toBeVisible();
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Register' })).toBeVisible();
  });

  test('Case 5: Sign In Page Has Correct Form Elements', async ({ page }) => {
    await page.goto('/auth/signin');
    await expect(page.getByLabel('Email Address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign In' })).toBeVisible();
    await expect(page.getByText("Don't have an account?")).toBeVisible();
  });

  test('Case 6: Register Validation - Empty Fields', async ({ page }) => {
    await page.goto('/auth/register');
    // Disable HTML5 validation to test JS validation or server response if applicable,
    // or simply try to submit. Since fields are 'required', browser validation kicks in.
    // We can check if the button exists and try to click it.
    // For this test, let's just check that we stay on the page if we don't fill anything.
    await page.getByRole('button', { name: 'Register' }).click();
    // Should still be on register page
    await expect(page).toHaveURL(/.*\/auth\/register/);
  });

  test('Case 7: Sign In Validation - Invalid Email Format', async ({ page }) => {
    await page.goto('/auth/signin');
    await page.getByLabel('Email Address').fill('invalid-email');
    await page.getByLabel('Password').fill('password123');
    await page.getByRole('button', { name: 'Sign In' }).click();
    // Browser validation should prevent submission, or if not, we stay on page
    await expect(page).toHaveURL(/.*\/auth\/signin/);
  });

  test('Case 8: Navigation from Sign In to Register', async ({ page }) => {
    await page.goto('/auth/signin');
    await page.getByRole('link', { name: 'Create an account' }).click();
    await expect(page).toHaveURL(/.*\/auth\/register/);
    await expect(page.getByRole('heading', { name: 'Create Account' })).toBeVisible();
  });

  test('Case 9: Navigation from Register to Sign In', async ({ page }) => {
    await page.goto('/auth/register');
    await page.getByRole('link', { name: 'Sign in' }).click();
    await expect(page).toHaveURL(/.*\/auth\/signin/);
    await expect(page.getByRole('heading', { name: 'Welcome Back' })).toBeVisible();
  });

  test('Case 10: Footer Content Verification on Multiple Pages', async ({ page }) => {
    const pages = ['/', '/auth/signin', '/auth/register'];
    for (const path of pages) {
      await page.goto(path);
      // Layout component wraps all pages, so footer should be present everywhere
      // except if layout is different. Based on current code, it seems layout is global.
      // Wait, layout.tsx wraps everything.
      // Let's verify our specific footer ID/text.
      await expect(page.getByText('67162110050-9')).toBeVisible();
    }
  });

});
