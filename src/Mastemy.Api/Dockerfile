FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src
COPY src/Mastemy.Api/Mastemy.Api.csproj src/Mastemy.Api/
RUN dotnet restore src/Mastemy.Api/Mastemy.Api.csproj
COPY src/Mastemy.Api/ src/Mastemy.Api/
RUN dotnet publish src/Mastemy.Api/Mastemy.Api.csproj -c Release -o /app --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app .
# Non-video supporting resources and data-protection keys live in a mounted volume; no video is ever stored here.
RUN mkdir -p /app/data/resources /app/data/keys && chown -R app:app /app/data
USER app
ENV ASPNETCORE_URLS=http://+:8080 DataProtection__KeysPath=/app/data/keys
EXPOSE 8080
ENTRYPOINT ["dotnet", "Mastemy.Api.dll"]
