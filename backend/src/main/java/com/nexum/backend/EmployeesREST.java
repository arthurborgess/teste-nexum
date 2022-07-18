package com.nexum.backend;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.nexum.backend.database.EmployeesRepository;
import com.nexum.backend.entities.Employees;

@RestController
@RequestMapping("/employees")
@CrossOrigin("*")
public class EmployeesREST {

    @Autowired
    private EmployeesRepository repository;

    @GetMapping
    public List<Employees> list() {
        return repository.findAll();
    }

    @PostMapping
    public void Save(@RequestBody Employees employee) {
        repository.save(employee);
    }

    @PutMapping
    public void Update(@RequestBody Employees employee) {
        if (employee.getId() > 0) {
            repository.save(employee);
        }
    }

    @DeleteMapping
    public void Delete(@RequestBody Employees employee) {
        repository.delete(employee);
    }
}
