  GNU nano 6.2                                  install.sh *                                    M
#!/bin/bash -x

       apt -y update
       apt -y install mariadb-server
     ;;
     "MARIADB_10.11")
       wget -qO- https://mariadb.org/mariadb_release_signing_key.asc | gpg --dea
rmor > /etc/apt/trusted.gpg.d/mariadb.gpg
       echo "deb [arch=amd64,arm64] https://mirror.mariadb.org/repo/10.11/ubuntu
/ jammy main" > /etc/apt/sources.list.d/mariadb.list
       apt -y update
       apt -y install mariadb-server
     ;;
      *)
        die "Database Engine $DB_ENGINE not supported."
      ;;
      esac
  fi
}

setupCloudPanel()
{
  DEBIAN_FRONTEND=noninteractive apt -o Dpkg::Options::="--force-overwrite" inst
all -y cloudpanel
  local CLP_RUNNING=$(lsof -u^root -i:8443 -P -n -sTCP:LISTEN)
  if [ -z "${CLP_RUNNING}" ]; then
    die "${RED_TEXT_COLOR}CloudPanel couldn't be installed. Check the log above
for errors that occurred in the install process.${RESET_TEXT_COLOR}"
  fi
  showSuccessMessage
}

showSuccessMessage()
{
  CLOUDPANEL_URL="https://$IP:8443"
  printf "\n\n"
  printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
  printf "${GREEN_TEXT_COLOR}The installation of CloudPanel is complete!${RESET_
TEXT_COLOR}\n\n"
  printf "CloudPanel can be accessed now:${YELLOW_TEXT_COLOR} $CLOUDPANEL_URL ${
RESET_TEXT_COLOR}\n"
  printf "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n"
}

cleanUp()
{
  history -c
  apt clean
  rm $0
}

setOSInfo
checkRequirements
setIp
setupRequiredPackages
generateLocales
removeUnnecessaryPackages
installMySQL
setupCloudPanel
cleanUpr