#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
import time

class AuthAPITester:
    def __init__(self, base_url="https://961407ad-1eff-4325-8efb-9cfdf7915488.preview.emergentagent.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            self.failed_tests.append(f"{name}: {details}")
            print(f"❌ {name}: {details}")

    def test_health_endpoint(self):
        """Test health endpoint"""
        try:
            response = self.session.get(f"{self.base_url}/api/health")
            success = response.status_code == 200 and "status" in response.json()
            self.log_test("Health endpoint", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Health endpoint", False, str(e))
            return False

    def test_register_user(self, email, password, name, city="Madrid", budget=600, lifestyle="Social y activo", description="Test user"):
        """Test user registration with complete profile"""
        try:
            payload = {
                "email": email,
                "password": password,
                "name": name,
                "city": city,
                "budget": budget,
                "lifestyle": lifestyle,
                "description": description
            }
            response = self.session.post(f"{self.base_url}/api/auth/register", json=payload)
            
            if response.status_code == 201 or response.status_code == 200:
                data = response.json()
                success = all(key in data for key in ["email", "name", "city", "budget", "lifestyle", "description"])
                self.log_test(f"Register user {email}", success, f"Status: {response.status_code}")
                return success, data
            else:
                self.log_test(f"Register user {email}", False, f"Status: {response.status_code}, Response: {response.text}")
                return False, {}
        except Exception as e:
            self.log_test(f"Register user {email}", False, str(e))
            return False, {}

    def test_login_user(self, email, password):
        """Test user login"""
        try:
            payload = {"email": email, "password": password}
            response = self.session.post(f"{self.base_url}/api/auth/login", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                # Check if cookies are set
                has_cookies = 'access_token' in response.cookies or 'refresh_token' in response.cookies
                success = "email" in data and has_cookies
                self.log_test(f"Login user {email}", success, f"Status: {response.status_code}, Cookies: {has_cookies}")
                return success, data
            else:
                self.log_test(f"Login user {email}", False, f"Status: {response.status_code}, Response: {response.text}")
                return False, {}
        except Exception as e:
            self.log_test(f"Login user {email}", False, str(e))
            return False, {}

    def test_get_current_user(self):
        """Test getting current user from cookie"""
        try:
            response = self.session.get(f"{self.base_url}/api/auth/me")
            
            if response.status_code == 200:
                data = response.json()
                success = "email" in data and "name" in data
                self.log_test("Get current user", success, f"Status: {response.status_code}")
                return success, data
            else:
                self.log_test("Get current user", False, f"Status: {response.status_code}, Response: {response.text}")
                return False, {}
        except Exception as e:
            self.log_test("Get current user", False, str(e))
            return False, {}

    def test_update_profile(self, name=None, city=None, budget=None, lifestyle=None, description=None):
        """Test profile update"""
        try:
            payload = {}
            if name: payload["name"] = name
            if city: payload["city"] = city
            if budget: payload["budget"] = budget
            if lifestyle: payload["lifestyle"] = lifestyle
            if description: payload["description"] = description
            
            response = self.session.put(f"{self.base_url}/api/auth/profile", json=payload)
            
            if response.status_code == 200:
                data = response.json()
                success = "email" in data
                self.log_test("Update profile", success, f"Status: {response.status_code}")
                return success, data
            else:
                self.log_test("Update profile", False, f"Status: {response.status_code}, Response: {response.text}")
                return False, {}
        except Exception as e:
            self.log_test("Update profile", False, str(e))
            return False, {}

    def test_save_property(self, property_id):
        """Test saving a property"""
        try:
            response = self.session.post(f"{self.base_url}/api/saved/{property_id}")
            success = response.status_code in [200, 201]
            self.log_test(f"Save property {property_id}", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test(f"Save property {property_id}", False, str(e))
            return False

    def test_get_saved_properties(self):
        """Test getting saved properties"""
        try:
            response = self.session.get(f"{self.base_url}/api/saved")
            
            if response.status_code == 200:
                data = response.json()
                success = isinstance(data, list)
                self.log_test("Get saved properties", success, f"Status: {response.status_code}, Count: {len(data)}")
                return success, data
            else:
                self.log_test("Get saved properties", False, f"Status: {response.status_code}, Response: {response.text}")
                return False, []
        except Exception as e:
            self.log_test("Get saved properties", False, str(e))
            return False, []

    def test_unsave_property(self, property_id):
        """Test removing a saved property"""
        try:
            response = self.session.delete(f"{self.base_url}/api/saved/{property_id}")
            success = response.status_code == 200
            self.log_test(f"Unsave property {property_id}", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test(f"Unsave property {property_id}", False, str(e))
            return False

    def test_logout(self):
        """Test logout"""
        try:
            response = self.session.post(f"{self.base_url}/api/auth/logout")
            success = response.status_code == 200
            self.log_test("Logout", success, f"Status: {response.status_code}")
            return success
        except Exception as e:
            self.log_test("Logout", False, str(e))
            return False

    def test_brute_force_protection(self, email="brute@test.com"):
        """Test brute force protection after 5 failed attempts"""
        try:
            print(f"\n🔒 Testing brute force protection for {email}...")
            
            # Try 6 failed login attempts
            for i in range(6):
                payload = {"email": email, "password": "wrongpassword"}
                response = self.session.post(f"{self.base_url}/api/auth/login", json=payload)
                print(f"   Attempt {i+1}: Status {response.status_code}")
                
                if i < 5:
                    # First 5 should be 401 (unauthorized)
                    if response.status_code != 401:
                        self.log_test("Brute force protection", False, f"Expected 401 on attempt {i+1}, got {response.status_code}")
                        return False
                else:
                    # 6th attempt should be 429 (too many requests)
                    if response.status_code == 429:
                        self.log_test("Brute force protection", True, "Locked out after 5 failed attempts")
                        return True
                    else:
                        self.log_test("Brute force protection", False, f"Expected 429 on attempt 6, got {response.status_code}")
                        return False
                        
                time.sleep(0.5)  # Small delay between attempts
                
        except Exception as e:
            self.log_test("Brute force protection", False, str(e))
            return False

    def run_all_tests(self):
        """Run comprehensive authentication tests"""
        print("🚀 Starting Match&Live Authentication API Tests")
        print("=" * 60)
        
        # Test health endpoint first
        if not self.test_health_endpoint():
            print("❌ Health endpoint failed - stopping tests")
            return False
        
        # Test user registration
        test_email = f"test_{int(time.time())}@matchlive.com"
        register_success, user_data = self.test_register_user(
            email=test_email,
            password="Test123!",
            name="Test User",
            city="Barcelona",
            budget=800,
            lifestyle="Estudiante",
            description="Testing user registration"
        )
        
        if not register_success:
            print("❌ Registration failed - stopping tests")
            return False
        
        # Test getting current user after registration
        self.test_get_current_user()
        
        # Test profile update
        self.test_update_profile(
            name="Updated Test User",
            city="Valencia",
            budget=900,
            lifestyle="Trabajador remoto",
            description="Updated description"
        )
        
        # Test property saving functionality
        property_id = 1
        self.test_save_property(property_id)
        self.test_get_saved_properties()
        self.test_unsave_property(property_id)
        
        # Verify property was removed
        self.test_get_saved_properties()
        
        # Test logout
        self.test_logout()
        
        # Test login with existing admin user
        admin_success, admin_data = self.test_login_user("admin@matchlive.com", "Admin123!")
        if admin_success:
            self.test_get_current_user()
            self.test_logout()
        
        # Test brute force protection
        self.test_brute_force_protection()
        
        # Print summary
        print("\n" + "=" * 60)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.failed_tests:
            print("\n❌ Failed Tests:")
            for test in self.failed_tests:
                print(f"   - {test}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = AuthAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())