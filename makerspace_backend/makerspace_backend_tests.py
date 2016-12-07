import os
import makerspace_backend
import unittest
import tempfile
import json

class MakerSpaceBackendTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, makerspace_backend.app.config['DATABASE'] = tempfile.mkstemp()
        makerspace_backend.app.config['TESTING'] = True
        self.app = makerspace_backend.app.test_client()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(makerspace_backend.app.config['DATABASE'])

    def test_get_users(self):
        resp = self.app.get('/v1/users')
        resp = json.loads(resp.data)
        expected_vunet_IDs = ['stallhr', 'stahlje']
        for user in resp['users']:
            assert user['vunetID'] in expected_vunet_IDs

    def test_get_equipment(self):
        resp = self.app.get('/v1/equipment')
        resp = json.loads(resp.data)
        expected_equipment = ['Laser Cutter']
        for equipment in resp['equipment']:
            assert equipment['name'] in expected_equipment

    def test_get_certifications(self):
        resp = self.app.get('/v1/certifications')
        resp = json.loads(resp.data)
        expected_certs = ['Lasers']
        for cert in resp['certifications']:
            assert cert['name'] in expected_certs

if __name__ == '__main__':
    unittest.main()
