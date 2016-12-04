import os
import makerspace_backend
import unittest
import tempfile

class MakerSpaceBackendTestCase(unittest.TestCase):

    def setUp(self):
        self.db_fd, makerspace_backend.app.config['DATABASE'] = tempfile.mkstemp()
        makerspace_backend.app.config['TESTING'] = True
        self.app = makerspace_backend.app.test_client()

    def tearDown(self):
        os.close(self.db_fd)
        os.unlink(makerspace_backend.app.config['DATABASE'])

if __name__ == '__main__':
    unittest.main()
