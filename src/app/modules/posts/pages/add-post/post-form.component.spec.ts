import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostFormComponent } from './post-form.component';
import { InputFieldComponent } from 'src/app/shared/components/input-field/input-field.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { UserResolverService } from 'src/app/services/user-resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('AddPostComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFormComponent, InputFieldComponent ],
      providers: [  UserResolverService, FormBuilder ],
      imports: [RouterTestingModule, HttpClientTestingModule ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA,
        NO_ERRORS_SCHEMA
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render title in a h3 tag', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Post');
  });
  it('should render button text', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('.btn.btn-primary').textContent).toContain('Save' || 'Update');
  });
});
