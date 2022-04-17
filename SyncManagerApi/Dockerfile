FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS restore-all
WORKDIR /SyncManagerApi
COPY . .
RUN dotnet restore "SyncManagerApi.sln"

FROM restore-all AS build
RUN dotnet build "SyncManagerApi.sln" -c Release

FROM build AS publish
RUN dotnet publish "SyncManagerApi.sln" -c Release

FROM base AS SyncManagerApi
WORKDIR /SyncManagerApi

COPY --from=publish /SyncManagerApi/bin/Release/net6.0/publish SyncManagerApi/
ENTRYPOINT ["/bin/bash","-c", "cd SyncManagerApi && dotnet SyncManagerApi.dll"]