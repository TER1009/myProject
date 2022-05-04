using System.Data.Common;
using System.Diagnostics;
using System.Data;
using System;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;

namespace adminTools
{
    class Program
    {
        static void Main(string[] args)
        {
            Console.WriteLine("Connecting to database...");
            try
            {
                using (Npgsql.NpgsqlConnection connection = new Npgsql.NpgsqlConnection("Host=localhost; Port=5432; Database=FWebsite; Username=postgres; Password=user"))
                {
                    connection.Open();
                    Console.WriteLine("Connecting succes...");
                    Console.WriteLine("Write email...");
                    var email = Console.ReadLine();
                    Console.WriteLine("Write login...");
                    var login = Console.ReadLine();
                    var password = "1";
                    var validPassword = "2";
                    while (!String.Equals(password, validPassword))
                    {
                        Console.WriteLine("Write password...");
                        password = Console.ReadLine();
                        Console.WriteLine("Repeat password...");
                        validPassword = Console.ReadLine();
                        if (!String.Equals(password, validPassword)) Console.WriteLine("Passwords don't match...");
                    }
                    var id = Guid.NewGuid();
                    var token = generateJwtToken(new ClaimsIdentity(new[] { new Claim("id", id.ToString()), })).ToString();//generateJwtToken(new ClaimsIdentity(new[] { new Claim("id", id.ToString()), })).ToString()
                    string role = "admin";
                    var command = new Npgsql.NpgsqlCommand(@$"INSERT INTO public.""Users""(id, nickname, email, password, token, role) VALUES(@id, @nickname, @email, @password, @token, @role); ", connection);
                    command.Parameters.AddWithValue("@id", id);
                    command.Parameters.AddWithValue("@nickname", login);
                    command.Parameters.AddWithValue("@email", email);
                    command.Parameters.AddWithValue("@password", password);
                    command.Parameters.AddWithValue("@token", token);
                    command.Parameters.AddWithValue("@role", role);
                    command.ExecuteNonQuery();
                    command.Dispose();
                    connection.Close();
                    Console.WriteLine("Account create...");
                }
            }
            catch (System.Exception ex)
            {
                Console.WriteLine("Connecting failed... " + ex.Message);
                Console.WriteLine(ex);
            }
        }

        static string generateJwtToken(ClaimsIdentity claims)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("SecretKey10125779374235322");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddHours(1),
                Issuer = "https://localhost:5001",
                Audience = "https://localhost:3000",
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}


// INSERT INTO public."Users"(
// 	id, nickname, email, password, "Discriminator", token, "tokenRefresh", role)
// 	VALUES ("1", "2", "3", "4", "5", "6", "7", "8");
// 0d9c16f9-c424-40cf-9c54-380ceddaf801