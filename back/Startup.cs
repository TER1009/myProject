using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using back.interfaces;
using back.services;
using Microsoft.AspNetCore.Authentication.Cookies;

namespace back
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            //my upd
            /////////////////////////////////////
            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(JwtBearerDefaults.AuthenticationScheme, options =>
            {
                options.RequireHttpsMetadata = true;
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    // ваш доп. конфиг
                };
            }).AddCookie();
            services.AddCors();
            services.AddTransient<userService>();
            services.AddDistributedMemoryCache();

            // services.AddSession(options =>
            // {
            //     options.IdleTimeout = TimeSpan.FromMinutes(10);
            //     options.Cookie.HttpOnly = true;
            //     options.Cookie.IsEssential = true;
            //     options.Cookie.Domain = "api.example.com";
            //     options.Cookie.Path = "\\";
            //     //options.Cookie.SameSite = SameSiteMode.Strict;
            // });

            /////////////////////////////////////
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseRouting();
            //my upd
            ///////////////////////////////////
            app.UseCors(x => x
            .WithOrigins("https://localhost:3000", "https://127.0.0.1:3000",
             "http://api.example.com", "http://localhost:5001",
             "http://127.0.0.1:3000") // путь к нашему SPA клиенту
            .AllowCredentials()
            .AllowAnyMethod()
            .AllowAnyHeader());

            // app.Use(async (context, next) =>
            // {
            //     var token = context.Request.Cookies[".AspNetCore.Session"];
            //     if (!string.IsNullOrEmpty(token))
            //         context.Request.Headers.Add("Authorization", "Bearer " + token);

            //     await next();
            // });

            //app.UseSession();
            ////////////////////////////////////
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.UseCookiePolicy(new CookiePolicyOptions
            {
                // MinimumSameSitePolicy = SameSiteMode.Strict,
                // HttpOnly = HttpOnlyPolicy.Always,
                // Secure = CookieSecurePolicy.Always
                MinimumSameSitePolicy = SameSiteMode.Strict,
                HttpOnly = HttpOnlyPolicy.Always,
                // При включении HTTPS нужно вернуть CookieSecurePolicy.Always
                Secure = CookieSecurePolicy.None,
            });
            app.UseAuthentication();
            // Не забыть вернуть в app.UseCookiePolicy параметр Secure = CookieSecurePolicy.Always,
            //app.UseHttpsRedirection();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
