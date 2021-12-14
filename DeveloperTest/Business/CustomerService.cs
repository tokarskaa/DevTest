using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DeveloperTest.Business.Interfaces;
using DeveloperTest.Database;
using DeveloperTest.Database.Models;
using DeveloperTest.Models;

namespace DeveloperTest.Business
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext context;

        public CustomerService(ApplicationDbContext _context)
        {
            context = _context;
        }

        public CustomerModel CreateCustomer(CreateCustomerModel customer)
        {
            var addedCustomer = context.Customers.Add(new Customer
            {
                Name = customer.Name,
                Type = (CustomerType)Enum.Parse(typeof(CustomerType), customer.Type)
            });

            context.SaveChanges();

            return new CustomerModel
            {
                Id = addedCustomer.Entity.Id,
                Name = addedCustomer.Entity.Name,
                Type = addedCustomer.Entity.Type.ToString()
            };
        }

        public CustomerModel GetCustomer(int id)
        {
            return context.Customers
                .Where(c => c.Id == id)
                .Select(c => new CustomerModel
                { 
                    Id = c.Id,
                    Type = c.Type.ToString(),
                    Name = c.Name
                })
                .SingleOrDefault();
        }

        public CustomerModel[] GetCustomers()
        {
            return context.Customers.Select(x => new CustomerModel
            {
                Id = x.Id,
                Type = x.Type.ToString(),
                Name = x.Name
            }).ToArray();
        }
    }
}
