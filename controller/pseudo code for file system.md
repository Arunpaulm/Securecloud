pseudo code for file system

Step 1: Copy / download file from the source to our device

if device == apple pc/phone
    the file is stored to the harddisk which is encrypted. at this point the container is encrypted not the files.

if device == android / windows / linux
    the file is stored in the harddisk which has no protected except user authorisation.

Step 2: Access the file from the device

if device == apple pc/phone
    When the user login into their system. the harddisk gets decrypted and the file is enable for access

if device == android / windows / linux
    Users can access the file at any point in time using user authorisation other options like dev debugging provides full access without user login.

Step 3: Share the file with other uses.

if device == apple pc/phone
    the file is stored to safely in the encrypted harddisk. once the file gets out of that bound no further protection is provided.

if device == android / windows / linux
    Except user authorisation no data protection is provided.

Our project:

Step 1 : Copy / download file from the source to our device

If "any platform"
    the file is scan for virus and safely stored in a secure space. Taking advantage of the security provided by the platform. The file is encrypted on demand by the user.

    (Enabling AI to detect the sensitivity of the file is in progress)

Step 2: Access the file from the device.

If "mobile"
    The application opens a popup window that lists all the available application which user can select to view the file.

If "Web"
    the file will get downloaded by the browser and user can view the file.

Step 3: Share the file with other uses.

If "mobile"
    the encrypted file will be enable to share with any media available.

If "Web"
    the encrypted file will get downloaded by the browser and user can share the file.

Note: in both the case user holds the key or password for the file unless the key is shared no user will get access to the file.