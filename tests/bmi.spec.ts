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

});
