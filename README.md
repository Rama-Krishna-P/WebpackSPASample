# Webpack SPA Sample

This project outlines how to host a web pack SPA on .NET Core application along side apis.

## Project Creation

Create an ASP.NET core application project using empty template.

## Add SPA app

1) Create a folder "ClientApp" in the root directory of the project.
2) Create the web pack SPA client application in this "ClientApp" folder.

## Add the necessary NuGet package

Add the "Microsoft.AspNetCore.SpaServices.Extensions" package compatible with the target framework of the project.

## Add spa support in the startup class

In the startup make the below changes to support SPA<br/>

1) Add SPA in the ConfigureServices method
```
services.AddSpaStaticFiles(configuration =>
{
    configuration.RootPath = "ClientApp/dist";
});
``` 
2) Configure SPA in the Configure method

```
if (env.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}

app.UseStaticFiles();

if (!env.IsDevelopment())
{
    app.UseSpaStaticFiles();
}

app.UseRouting();

app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";

    if (env.IsDevelopment())
    {
        spa.UseProxyToSpaDevelopmentServer("http://localhost:8082");
    }
});
```
Make sure to change the SPA development server address accordingly.

## Modify cs project file to publish client app artifacts

Open the cs project file and make the below changes
```
...
<PropertyGroup>
    <TargetFramework>netcoreapp3.1</TargetFramework>
    <SpaRoot>ClientApp\</SpaRoot>
    <DefaultItemExcludes>$(DefaultItemExcludes);$(SpaRoot)node_modules\**</DefaultItemExcludes>
    <BuildServerSideRenderer>false</BuildServerSideRenderer>
</PropertyGroup>

...

<ItemGroup>
    <!-- Don't publish the SPA source files, but do show them in the project files list -->
    <Content Remove="$(SpaRoot)**" />
    <None Remove="$(SpaRoot)**" />
    <None Include="$(SpaRoot)**" Exclude="$(SpaRoot)node_modules\**" />
    <Content Remove="$(SpaRoot)package.json" />
    <Content Remove="$(SpaRoot)package-lock.json" />
</ItemGroup>

<Target Name="PublishRunWebpack" AfterTargets="ComputeFilesToPublish">
    <!-- As part of publishing, ensure the JS resources are freshly built in production mode -->
    <Exec WorkingDirectory="$(SpaRoot)" Command="npm install" />
    <Exec WorkingDirectory="$(SpaRoot)" Command="npm run build" />

    <!-- Include the newly-built files in the publish output -->
    <ItemGroup>
      <DistFiles Include="$(SpaRoot)dist\**; $(SpaRoot)dist-server\**" />
      <ResolvedFileToPublish Include="@(DistFiles->'%(FullPath)')" Exclude="@(ResolvedFileToPublish)">
        <RelativePath>%(DistFiles.Identity)</RelativePath>
        <CopyToPublishDirectory>PreserveNewest</CopyToPublishDirectory>
        <ExcludeFromSingleFile>true</ExcludeFromSingleFile>
      </ResolvedFileToPublish>
    </ItemGroup>
</Target>

```

## Add APIs
1. Add controller in ConfigureServices method
```
services.AddControllers();
```
2. Configure api endpoints in the Configure method
```
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute(
        name: "default",
        pattern: "api/{controller}/{action=Index}/{id?}");
});
```
3. Follow the below format for the controllers
```
[ApiController]
[Route("api/[controller]")]
public class HomeController : ControllerBase 
{
    [HttpGet]
    public IActionResult Index()
    {
        return Ok("Test");
    }
}
```