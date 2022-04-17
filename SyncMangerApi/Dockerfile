FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS restore-all
WORKDIR /SyncMangerApi
COPY . .
RUN dotnet restore "SyncMangerApi.sln"

FROM restore-all AS build
RUN dotnet build "SyncMangerApi.sln" -c Release

FROM build AS publish
RUN dotnet publish "SyncMangerApi.sln" -c Release

FROM base AS SyncMangerApi
WORKDIR /SyncMangerApi

COPY --from=publish /SyncMangerApi/bin/Release/net6.0/publish SyncMangerApi/
