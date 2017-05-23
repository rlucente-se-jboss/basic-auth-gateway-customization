# basic-auth-gateway-customization
This includes 2 parts:
    A customized Gateway
    A webservice that has basic-auth enabled
## To run the Gateway
  1) fork this repo
  2) change the line in apicast.conf that matches 
        - proxy_set_header Authorization "Basic am9objpzZWNyZXQ="; 
       - to reflect your header's actual value
  3) Create a OCP Build 
    - oc new-build https://github.com/brandoncox/basic-auth-gateway-customization --strategy=docker
  4) Get the image stream URL
        - oc get is/basic-auth-gateway-customization
        - RESULT:
            - 172.30.87.166:5000/gateway-unmodified/test-apicast-customization
  5) Configure access Token in portal:
      - a) Gear Icon in top right corner -> Personal Settings -> Token -> Add Access Token
      - b) Give it a unique name, click all 3 boxes for  Billing API, Account Management API, Analytics API and make the token READ/WRITE
      - c) COPY THE TOKEN SOMEWHERE SAFE!
  6) Create an OpenShift Secret:
      - oc secret new-basicauth apicast-configuration-url-secret --password=https://<ACCESS_TOKEN>@<DOMAIN>-admin.3scale.net
  7) Deploy the Custom Gateway from the Image Stream:
  
     - oc new-app -f https://raw.githubusercontent.com/3scale/apicast/v3.0.0/openshift/apicast-template.yml -p IMAGE_NAME=172.30.87.166:5000/gateway-unmodified/test-apicast-customization -p SERVICES_LIST=<UNIQUE_3SCALE_ID> -p LOG_LEVEL=info
