FROM gitpod/workspace-full:latest

RUN bash -c ". .nvm/nvm.sh     && nvm install 24     && nvm use 24    && nvm alias default 24"

RUN echo "nvm use default &>/dev/null" >> ~/.bashrc.d/51-nvm-fix